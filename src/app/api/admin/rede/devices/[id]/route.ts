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
    name: body.name,
    type: body.type,
    siteId: body.siteId || null,
    mgmtIp: body.mgmtIp || null,
    vendor: body.vendor || null,
    model: body.model || null,
    serial: body.serial || null,
    osVersion: body.osVersion || null,
    tags: body.tags || null,
    notes: body.notes || null,
  }
  const updated = await (prisma as any).networkDevice.update({ where: { id }, data })
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = params.id
  await (prisma as any).networkDevice.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
