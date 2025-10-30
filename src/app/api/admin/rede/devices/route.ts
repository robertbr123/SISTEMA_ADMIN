import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim().toLowerCase()
  const siteId = searchParams.get('siteId') || undefined
  const where: any = {}
  if (q) where.OR = [{ name: { contains: q } }, { vendor: { contains: q } }, { model: { contains: q } }]
  if (siteId) where.siteId = siteId
  const items = await (prisma as any).networkDevice.findMany({ where, orderBy: { name: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const data = {
    name: body.name,
    type: body.type || 'OTHER',
    siteId: body.siteId || null,
    mgmtIp: body.mgmtIp || null,
    vendor: body.vendor || null,
    model: body.model || null,
    serial: body.serial || null,
    osVersion: body.osVersion || null,
    tags: body.tags || null,
    notes: body.notes || null,
  }
  if (!data.name) return NextResponse.json({ error: 'name is required' }, { status: 400 })
  const created = await (prisma as any).networkDevice.create({ data })
  return NextResponse.json(created)
}
