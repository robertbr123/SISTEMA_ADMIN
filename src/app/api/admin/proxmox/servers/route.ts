import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const servers = await prisma.proxmoxServer.findMany({ orderBy: { createdAt: 'desc' } })
  const safe = servers.map((s: any) => ({
    id: s.id,
    name: s.name,
    baseUrl: s.baseUrl,
    user: s.user,
    insecure: s.insecure,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  }))
  return NextResponse.json(safe)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const { name, baseUrl, user, tokenId, tokenSecret, insecure } = body
  if (!name || !baseUrl || !user || !tokenId || !tokenSecret) {
    return NextResponse.json({ error: 'name, baseUrl, user, tokenId, tokenSecret required' }, { status: 400 })
  }
  // Normalize tokenId if it contains user@realm!
  let tid: string = String(tokenId)
  if (tid.includes('!')) {
    const parts = tid.split('!')
    tid = parts[parts.length - 1] || tid
  }
  const server = await prisma.proxmoxServer.create({ data: { name, baseUrl, user, tokenId: tid, tokenSecret, insecure: !!insecure } })
  return NextResponse.json({ id: server.id })
}
