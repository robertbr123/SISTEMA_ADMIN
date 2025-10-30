import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function ensureTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS Clients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      document TEXT,
      email TEXT,
      phone TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      zipCode TEXT,
      status TEXT DEFAULT 'active',
      notes TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME
    )
  `)
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }
  await ensureTable()
  const rows = await prisma.$queryRawUnsafe<any[]>(`SELECT * FROM Clients ORDER BY datetime(createdAt) DESC`)
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }
  await ensureTable()
  const body = await req.json().catch(() => ({}))
  const id = randomUUID()
  const name = String(body.name || '').trim()
  if (!name) return NextResponse.json({ error: 'Nome é obrigatório' }, { status: 400 })
  const document = body.document ?? null
  const email = body.email ?? null
  const phone = body.phone ?? null
  const address = body.address ?? null
  const city = body.city ?? null
  const state = body.state ?? null
  const zipCode = body.zipCode ?? null
  const status = (body.status === 'inactive') ? 'inactive' : 'active'
  const notes = body.notes ?? null
  await prisma.$executeRaw`INSERT INTO Clients (id, name, document, email, phone, address, city, state, zipCode, status, notes) VALUES (${id}, ${name}, ${document}, ${email}, ${phone}, ${address}, ${city}, ${state}, ${zipCode}, ${status}, ${notes})`
  const created = await prisma.$queryRaw<any[]>`SELECT * FROM Clients WHERE id = ${id}`
  return NextResponse.json(created[0] || null)
}
