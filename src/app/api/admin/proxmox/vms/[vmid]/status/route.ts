import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ensureProxmoxEnv, proxmoxPost, ProxmoxServerConfig } from '@/lib/proxmox/client'
import { prisma } from '@/lib/prisma'

// POST /api/admin/proxmox/vms/[vmid]/status?action=start|stop|reboot&node=NODE&type=qemu|lxc
export async function POST(request: NextRequest, { params }: { params: { vmid: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(request.url)
  const action = url.searchParams.get('action') || ''
  const node = url.searchParams.get('node') || ''
  const type = (url.searchParams.get('type') || 'qemu').toLowerCase()
  const serverId = url.searchParams.get('serverId') || undefined
  const vmid = params.vmid

  if (!node || !vmid || !['start','stop','reboot','shutdown'].includes(action)) {
    return NextResponse.json({ error: 'Missing node/vmid or invalid action' }, { status: 400 })
  }

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
    const kind = type === 'lxc' ? 'lxc' : 'qemu'
    const path = `/nodes/${encodeURIComponent(node)}/${kind}/${encodeURIComponent(vmid)}/status/${action}`
    const resp = await proxmoxPost<any>(path, undefined, serverConfig)
    return NextResponse.json({ success: true, data: resp?.data ?? null })
  } catch (e: any) {
    console.error('Proxmox VM action error:', action, node, vmid, e?.message || e)
    return NextResponse.json({ error: 'Failed to execute action', details: String(e) }, { status: 502 })
  }
}
