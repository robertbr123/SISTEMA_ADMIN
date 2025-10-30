import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim()
  const subnetId = searchParams.get('subnetId') || ''
  const deviceId = searchParams.get('deviceId') || ''

  // Ensure dynamic columns exist (SQLite): pppName may be added at runtime by sync route
  try {
    await (prisma as any).$executeRawUnsafe('ALTER TABLE "NetworkIP" ADD COLUMN "pppName" TEXT')
  } catch (e) {
    // ignore if column already exists
  }

  // Use raw SQL to include columns not present in Prisma schema (pppName)
  let where = '1=1'
  const params: any[] = []
  if (q) {
    where += ' AND (address LIKE ? OR ifnull(fqdn, "") LIKE ? OR ifnull(purpose, "") LIKE ? OR ifnull(pppName, "") LIKE ? OR ifnull(mac, "") LIKE ? OR ifnull(interface, "") LIKE ?)'
    const pattern = `%${q}%`
    params.push(pattern, pattern, pattern, pattern, pattern, pattern)
  }
  if (subnetId) { where += ' AND subnetId = ?'; params.push(subnetId) }
  if (deviceId) { where += ' AND ifnull(deviceId, "") = ?'; params.push(deviceId) }

  const sql = `SELECT id, address, subnetId, status, deviceId, interface, fqdn, purpose, mac, tags, notes, lastSeen, pppName FROM "NetworkIP" WHERE ${where} ORDER BY address ASC`
  const rows = await (prisma as any).$queryRawUnsafe(sql, ...params)
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const data = {
    address: body.address,
    subnetId: body.subnetId,
    status: body.status || 'AVAILABLE',
    deviceId: body.deviceId || null,
    interface: body.interface || null,
    fqdn: body.fqdn || null,
    purpose: body.purpose || null,
    mac: body.mac || null,
    tags: body.tags || null,
    notes: body.notes || null,
  }
  if (!data.address || !data.subnetId) return NextResponse.json({ error: 'address and subnetId required' }, { status: 400 })
  const created = await (prisma as any).networkIP.create({ data })
  return NextResponse.json(created)
}
