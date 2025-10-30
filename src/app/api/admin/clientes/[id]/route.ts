import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

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

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }
  await ensureTable()
  const rows = await prisma.$queryRaw<any[]>`SELECT * FROM Clients WHERE id = ${params.id}`
  if (!rows.length) return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 })
  return NextResponse.json(rows[0])
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }
  await ensureTable()
  const body = await req.json().catch(() => ({}))
  const fields: string[] = []
  const values: any[] = []
  function setField(col: string, val: any) { fields.push(`${col} = ?`); values.push(val) }
  if (typeof body.name === 'string') setField('name', body.name)
  if (typeof body.document === 'string') setField('document', body.document)
  if (typeof body.email === 'string') setField('email', body.email)
  if (typeof body.phone === 'string') setField('phone', body.phone)
  if (typeof body.address === 'string') setField('address', body.address)
  if (typeof body.city === 'string') setField('city', body.city)
  if (typeof body.state === 'string') setField('state', body.state)
  if (typeof body.zipCode === 'string') setField('zipCode', body.zipCode)
  if (typeof body.status === 'string') setField('status', body.status === 'inactive' ? 'inactive' : 'active')
  if (typeof body.notes === 'string') setField('notes', body.notes)
  const sql = `UPDATE Clients SET ${fields.join(', ')}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`
  values.push(params.id)
  if (fields.length === 0) return NextResponse.json({ error: 'Nada para atualizar' }, { status: 400 })
  // Use unsafe because we build SQL dynamically (values are parameterized)
  await prisma.$executeRawUnsafe(sql, ...values)
  const rows = await prisma.$queryRaw<any[]>`SELECT * FROM Clients WHERE id = ${params.id}`
  return NextResponse.json(rows[0] || null)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }
  await ensureTable()
  await prisma.$executeRaw`DELETE FROM Clients WHERE id = ${params.id}`
  return NextResponse.json({ ok: true })
}
