import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim().toLowerCase()
  const where: any = q ? { OR: [{ name: { contains: q } }, { address: { contains: q } }] } : undefined
  const items = await (prisma as any).site.findMany({ where, orderBy: { name: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const data = {
    name: body.name,
    address: body.address || null,
    notes: body.notes || null,
    tags: body.tags || null,
  }
  if (!data.name) return NextResponse.json({ error: 'name is required' }, { status: 400 })
  const created = await (prisma as any).site.create({ data })
  return NextResponse.json(created)
}
