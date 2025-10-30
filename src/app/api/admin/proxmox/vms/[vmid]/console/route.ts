import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ensureProxmoxEnv, proxmoxPost, ProxmoxServerConfig } from '@/lib/proxmox/client'
import { prisma } from '@/lib/prisma'

// POST /api/admin/proxmox/vms/[vmid]/console
// Body: { node: string, type: 'qemu'|'lxc', serverId?: string }
// Returns: { wsUrl, port, ticket }
export async function POST(request: NextRequest, { params }: { params: { vmid: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({} as any))
  const vmid = params.vmid
  const node = String(body.node || '')
  const type = String(body.type || 'qemu').toLowerCase()
  const serverId = body.serverId ? String(body.serverId) : undefined

  if (!node || !vmid) {
    return NextResponse.json({ error: 'Missing node/vmid' }, { status: 400 })
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
    const path = `/nodes/${encodeURIComponent(node)}/${kind}/${encodeURIComponent(vmid)}/vncproxy`
    const paramsForm = new URLSearchParams()
    paramsForm.set('websocket', '1')
    // PVE will generate a VNC ticket and port
    const resp = await proxmoxPost<any>(path, paramsForm, serverConfig)
    const data = resp?.data || {}
    const port = data.port
    const ticket = data.ticket
    if (!port || !ticket) {
      return NextResponse.json({ error: 'Failed to get console ticket' }, { status: 502 })
    }
    // Build direct WS URL to Proxmox vncwebsocket endpoint
    const base = (serverConfig?.baseUrl || process.env.PROXMOX_API_URL || '').replace(/\/$/, '')
    const wsBase = base.replace(/^http/i, 'ws')
    const wsUrl = `${wsBase}/api2/json/nodes/${encodeURIComponent(node)}/${kind}/${encodeURIComponent(vmid)}/vncwebsocket?port=${encodeURIComponent(String(port))}&vncticket=${encodeURIComponent(ticket)}`
    return NextResponse.json({ wsUrl, port, ticket })
  } catch (e: any) {
    console.error('Proxmox console ticket error:', e?.message || e)
    return NextResponse.json({ error: 'Failed to get console ticket', details: String(e) }, { status: 502 })
  }
}
