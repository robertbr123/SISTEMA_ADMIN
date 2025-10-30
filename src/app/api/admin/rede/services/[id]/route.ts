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
    deviceId: body.deviceId,
    name: body.name,
    protocol: body.protocol,
    port: body.port,
    externalPort: body.externalPort || null,
    targetIp: body.targetIp || null,
    targetFqdn: body.targetFqdn || null,
    enabled: body.enabled,
    description: body.description || null,
    tags: body.tags || null,
  }
  const updated = await (prisma as any).networkService.update({ where: { id }, data })
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = params.id
  await (prisma as any).networkService.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
