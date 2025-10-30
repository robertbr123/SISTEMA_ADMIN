import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }
  const user = await prisma.user.findUnique({ where: { id: params.id } })
  if (!user) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  return NextResponse.json(user)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }
  const body = await req.json().catch(() => ({}))
  const data: any = {}
  if (typeof body.name === 'string') data.name = body.name
  if (typeof body.email === 'string') data.email = body.email
  if (typeof body.phone === 'string') data.phone = body.phone
  if (typeof body.address === 'string') data.address = body.address
  if (typeof body.city === 'string') data.city = body.city
  if (typeof body.state === 'string') data.state = body.state
  if (typeof body.zipCode === 'string') data.zipCode = body.zipCode
  if (typeof body.role === 'string' && (body.role === 'admin' || body.role === 'user')) data.role = body.role
  if (typeof body.password === 'string' && body.password.trim().length >= 6) {
    data.password = await bcrypt.hash(body.password, 10)
  }
  try {
    const updated = await prisma.user.update({ where: { id: params.id }, data })
    return NextResponse.json(updated)
  } catch (e: any) {
    if (String(e?.message || '').includes('Unique constraint failed on the fields: (`email`)')) {
      return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Falha ao atualizar usuário' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }
  try {
    await prisma.user.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Falha ao excluir usuário' }, { status: 500 })
  }
}
