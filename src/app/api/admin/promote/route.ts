import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session as any).role !== 'admin') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }

    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'ID do usuário é obrigatório' }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: 'admin' as any }
    })

    return NextResponse.json({
      message: 'Usuário promovido a admin com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: (user as any).role
      }
    })
  } catch (error) {
    console.error('Error promoting user:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}