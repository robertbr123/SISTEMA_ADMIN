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
  const items = await (prisma as any).networkSubnet.findMany({
    where: q ? { OR: [ { cidr: { contains: q } }, { name: { contains: q } }, { description: { contains: q } } ], ...(siteId?{siteId}:{}) } : (siteId?{ where: { siteId } } : undefined),
    orderBy: { cidr: 'asc' }
  })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const data = {
    cidr: body.cidr,
    name: body.name || null,
    description: body.description || null,
    siteId: body.siteId || null,
    vlanId: body.vlanId || null,
    parentId: body.parentId || null,
    tags: body.tags || null,
    notes: body.notes || null,
  }
  if (!data.cidr) return NextResponse.json({ error: 'cidr is required' }, { status: 400 })
  const created = await (prisma as any).networkSubnet.create({ data })
  return NextResponse.json(created)
}
