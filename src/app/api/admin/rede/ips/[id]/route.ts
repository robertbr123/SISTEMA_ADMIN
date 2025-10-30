import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const id = params.id
  const data = {
    address: body.address,
    subnetId: body.subnetId,
    status: body.status,
    deviceId: body.deviceId || null,
    interface: body.interface || null,
    fqdn: body.fqdn || null,
    purpose: body.purpose || null,
    mac: body.mac || null,
    tags: body.tags || null,
    notes: body.notes || null,
    lastSeen: body.lastSeen ? new Date(body.lastSeen) : undefined,
  }
  const updated = await (prisma as any).networkIP.update({ where: { id }, data })
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = params.id
  await (prisma as any).networkIP.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
