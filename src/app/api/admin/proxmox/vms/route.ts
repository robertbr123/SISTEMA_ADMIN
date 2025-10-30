import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ensureProxmoxEnv, proxmoxGet, proxmoxPost, ProxmoxServerConfig } from '@/lib/proxmox/client'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // Multi-server support: serverId optional. If absent, fallback to env.
  const url = new URL(req.url)
  const serverId = url.searchParams.get('serverId') || undefined
  let serverConfig: ProxmoxServerConfig | undefined
  if (serverId) {
    const s = await prisma.proxmoxServer.findUnique({ where: { id: serverId } })
    if (!s) return NextResponse.json({ error: 'Server not found' }, { status: 404 })
    serverConfig = { baseUrl: s.baseUrl, user: s.user, tokenId: s.tokenId, tokenSecret: s.tokenSecret, insecure: s.insecure }
  } else {
    const mis = ensureProxmoxEnv()
    if (mis) return mis
  }

  try {
    // cluster view gives all VMs across nodes
    const debug: any = { errors: [] as string[] }
    let clusterData: any[] = []
    try {
      const resp = await proxmoxGet<any>('/cluster/resources?type=vm', serverConfig)
      clusterData = resp?.data ?? []
    } catch (e: any) {
      debug.errors.push(`cluster list failed: ${e?.message || String(e)}`)
    }
    let data = clusterData

    const persist = url.searchParams.get('persist') === 'true'
    const persistMetrics = url.searchParams.get('metrics') === 'true'
    const forceNodes = url.searchParams.get('source') === 'nodes'

    // Some tokens only see per-node lists. If cluster list is empty or source=nodes, fall back.
    if (forceNodes || (Array.isArray(data) && data.length === 0)) {
      try {
        const nodesResp = await proxmoxGet<any>('/nodes', serverConfig)
        const nodes = nodesResp?.data ?? []
        const combined: any[] = []
        const byNode: Record<string, any> = {}
        for (const n of nodes) {
          const nodeName = n.node
          try {
            const qemu = await proxmoxGet<any>(`/nodes/${encodeURIComponent(nodeName)}/qemu`, serverConfig)
            const lxc = await proxmoxGet<any>(`/nodes/${encodeURIComponent(nodeName)}/lxc`, serverConfig)
            const qArr = (qemu?.data ?? []).map((v: any) => ({ ...v, node: nodeName, type: 'qemu' }))
            const lArr = (lxc?.data ?? []).map((v: any) => ({ ...v, node: nodeName, type: 'lxc' }))
            byNode[nodeName] = { qemu: qemu?.data ?? [], lxc: lxc?.data ?? [] }
            combined.push(...qArr, ...lArr)
          } catch (e: any) {
            const msg = `node ${nodeName} list failed: ${e?.message || String(e)}`
            console.error(msg)
            debug.errors.push(msg)
          }
        }
        data = combined
        debug.nodes = nodes
        debug.byNode = byNode
      } catch (e: any) {
        const msg = `nodes fallback failed: ${e?.message || String(e)}`
        console.error(msg)
        debug.errors.push(msg)
      }
    }

    if (persist) {
      for (const v of data) {
        try {
          // ensure node exists
          await prisma.proxmoxNode.upsert({
            where: { name_serverId: { name: v.node, serverId: serverId ?? '' } },
            update: { status: v.status ?? null },
            create: { name: v.node, serverId: serverId ?? '', status: v.status ?? null },
          })

          const vm = await prisma.proxmoxVM.upsert({
            where: { vmid_nodeName_serverId: { vmid: v.vmid, nodeName: v.node, serverId: serverId ?? '' } },
            update: {
              name: v.name ?? null,
              type: v.type ?? null,
              status: v.status ?? null,
              maxcpu: v.maxcpu ?? null,
              maxmem: v.maxmem ?? null,
              cpu: v.cpu ?? null,
              mem: v.mem ?? null,
              raw: JSON.stringify(v),
            },
            create: {
              vmid: v.vmid,
              nodeName: v.node,
              serverId: serverId ?? '',
              name: v.name ?? null,
              type: v.type ?? null,
              status: v.status ?? null,
              maxcpu: v.maxcpu ?? null,
              maxmem: v.maxmem ?? null,
              cpu: v.cpu ?? null,
              mem: v.mem ?? null,
              raw: JSON.stringify(v),
            },
          })

          if (persistMetrics) {
            await prisma.proxmoxMetric.create({
              data: {
                vmId: vm.id,
                vmNumericId: v.vmid,
                nodeName: v.node,
                serverId: serverId ?? '',
                cpu: v.cpu ?? null,
                mem: v.mem ?? null,
              },
            })
          }
        } catch (e) {
          const msg = `persist failed vmid=${v?.vmid} node=${v?.node}: ${e}`
          console.error(msg)
          debug.errors.push(msg)
        }
      }
    }

    if (url.searchParams.get('debug') === '1' || url.searchParams.get('debug') === 'true') {
      return NextResponse.json({ cluster: clusterData, data, ...debug })
    }
    return NextResponse.json(data)
  } catch (e: any) {
    console.error('Proxmox VMs error:', e?.message || e)
    return NextResponse.json({ error: 'Failed to list VMs', details: String(e) }, { status: 502 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json().catch(() => ({}))
  const {
    serverId,
    mode = 'clone-qemu',
    node,
    templateVmid,
    name,
    newid,
    full = true,
    storage,
    target, // optional target node
  } = body || {}

  if (!node) return NextResponse.json({ error: 'node is required' }, { status: 400 })

  let serverConfig: ProxmoxServerConfig | undefined
  if (serverId) {
    const s = await prisma.proxmoxServer.findUnique({ where: { id: serverId } })
    if (!s) return NextResponse.json({ error: 'Server not found' }, { status: 404 })
    serverConfig = { baseUrl: s.baseUrl, user: s.user, tokenId: s.tokenId, tokenSecret: s.tokenSecret, insecure: s.insecure }
  } else {
    const mis = ensureProxmoxEnv()
    if (mis) return mis
  }

  try {
    if (mode === 'clone-qemu') {
      if (!templateVmid) return NextResponse.json({ error: 'templateVmid is required' }, { status: 400 })

      let finalNewId = newid
      if (!finalNewId) {
        const next = await proxmoxGet<number>('/cluster/nextid', serverConfig)
        finalNewId = (next?.data as any) ?? undefined
        if (!finalNewId) return NextResponse.json({ error: 'Failed to get next VMID' }, { status: 502 })
      }

      const params = new URLSearchParams()
      params.set('newid', String(finalNewId))
      if (name) params.set('name', String(name))
      if (storage) params.set('storage', String(storage))
      if (target) params.set('target', String(target))
      params.set('full', full ? '1' : '0')

      const clonePath = `/nodes/${encodeURIComponent(node)}/qemu/${encodeURIComponent(String(templateVmid))}/clone`
      const resp = await proxmoxPost<{ upid: string }>(clonePath, params, serverConfig)
      const upid = (resp as any)?.data ?? (resp as any)?.upid
      return NextResponse.json({ ok: true, mode, upid, vmid: finalNewId })
    }

    return NextResponse.json({ error: `Unsupported mode: ${mode}` }, { status: 400 })
  } catch (e: any) {
    console.error('Proxmox create VM error:', e?.message || e)
    return NextResponse.json({ error: 'Failed to create VM', details: String(e) }, { status: 502 })
  }
}
