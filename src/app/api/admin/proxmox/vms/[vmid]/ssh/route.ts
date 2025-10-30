import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST body: { serverId, nodeName, sshHost, sshPort?, sshUser? }
export async function POST(request: NextRequest, { params }: { params: { vmid: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const vmid = Number(params.vmid)
  if (!vmid || Number.isNaN(vmid)) {
    return NextResponse.json({ error: 'Invalid vmid' }, { status: 400 })
  }
  const body = await request.json().catch(() => ({}))
  const serverId = String(body.serverId || '')
  const nodeName = String(body.nodeName || '')
  const sshHost = String(body.sshHost || '')
  const sshPort = body.sshPort ? Number(body.sshPort) : null
  const sshUser = body.sshUser ? String(body.sshUser) : null

  if (!serverId || !nodeName || !sshHost) {
    return NextResponse.json({ error: 'serverId, nodeName and sshHost are required' }, { status: 400 })
  }

  try {
    const vm = await prisma.proxmoxVM.upsert({
      where: { vmid_nodeName_serverId: { vmid, nodeName, serverId } },
      update: { sshHost, sshPort, sshUser },
      create: { vmid, nodeName, serverId, sshHost, sshPort, sshUser },
    })
    return NextResponse.json({ success: true, vm })
  } catch (e: any) {
    console.error('Update SSH info failed', e)
    return NextResponse.json({ error: 'Failed to update SSH info', details: String(e) }, { status: 500 })
  }
}
