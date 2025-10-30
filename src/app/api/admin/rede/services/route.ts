import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim().toLowerCase()
  const deviceId = searchParams.get('deviceId') || undefined
  const where: any = {}
  if (q) where.OR = [{ name: { contains: q } }, { description: { contains: q } }]
  if (deviceId) where.deviceId = deviceId
  const items = await (prisma as any).networkService.findMany({ where, orderBy: [{ deviceId: 'asc' }, { port: 'asc' }] })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const data = {
    deviceId: body.deviceId,
    name: body.name,
    protocol: body.protocol || 'TCP',
    port: body.port,
    externalPort: body.externalPort || null,
    targetIp: body.targetIp || null,
    targetFqdn: body.targetFqdn || null,
    enabled: body.enabled ?? true,
    description: body.description || null,
    tags: body.tags || null,
  }
  if (!data.deviceId || !data.name || !data.port) return NextResponse.json({ error: 'deviceId, name and port are required' }, { status: 400 })
  const created = await (prisma as any).networkService.create({ data })
  return NextResponse.json(created)
}
