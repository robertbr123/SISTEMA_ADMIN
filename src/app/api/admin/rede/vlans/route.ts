import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const siteId = searchParams.get('siteId') || undefined
  const items = await (prisma as any).vlan.findMany({ where: siteId ? { siteId } : undefined, orderBy: [{ siteId: 'asc' }, { vid: 'asc' }] })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const data = {
    name: body.name,
    vid: body.vid,
    siteId: body.siteId || null,
    description: body.description || null,
    tags: body.tags || null,
  }
  if (!data.name || typeof data.vid !== 'number') return NextResponse.json({ error: 'name and numeric vid are required' }, { status: 400 })
  const created = await (prisma as any).vlan.create({ data })
  return NextResponse.json(created)
}
