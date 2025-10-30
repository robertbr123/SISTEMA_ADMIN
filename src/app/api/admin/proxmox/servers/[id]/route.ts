import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// DELETE /api/admin/proxmox/servers/[id]
// Deletes server and related Proxmox data (metrics, VMs, nodes)
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const id = params.id
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  try {
    // Delete related rows first to avoid FK violations
    await prisma.proxmoxMetric.deleteMany({ where: { serverId: id } })
    await prisma.proxmoxVM.deleteMany({ where: { serverId: id } })
    await prisma.proxmoxNode.deleteMany({ where: { serverId: id } })
    await prisma.proxmoxServer.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('Delete server failed', id, e)
    return NextResponse.json({ error: 'Failed to delete', details: String(e) }, { status: 500 })
  }
}
