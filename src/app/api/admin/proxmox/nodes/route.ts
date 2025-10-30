import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ensureProxmoxEnv, proxmoxGet, ProxmoxServerConfig } from '@/lib/proxmox/client'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const url0 = new URL(req.url)
  const serverId = url0.searchParams.get('serverId') || undefined
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
    const resp = await proxmoxGet<any>('/nodes', serverConfig)
    const data = resp?.data ?? []

    const url = new URL(req.url)
    const persist = url.searchParams.get('persist') === 'true'

    if (persist) {
      for (const n of data) {
        try {
          await prisma.proxmoxNode.upsert({
            where: { name_serverId: { name: n.node, serverId: serverId ?? '' } },
            update: {
              status: n.status,
              maxcpu: n.maxcpu ?? null,
              maxmem: n.maxmem ?? null,
              cpu: n.cpu ?? null,
              mem: n.mem ?? null,
              uptime: n.uptime ?? null,
              raw: JSON.stringify(n),
            },
            create: {
              name: n.node,
              serverId: serverId ?? '',
              status: n.status,
              maxcpu: n.maxcpu ?? null,
              maxmem: n.maxmem ?? null,
              cpu: n.cpu ?? null,
              mem: n.mem ?? null,
              uptime: n.uptime ?? null,
              raw: JSON.stringify(n),
            },
          })
        } catch (e) {
          console.error('Persist node failed', n, e)
        }
      }
    }

    return NextResponse.json(data)
  } catch (e: any) {
    console.error('Proxmox nodes error:', e?.message || e)
    return NextResponse.json({ error: 'Failed to list nodes', details: String(e) }, { status: 502 })
  }
}
