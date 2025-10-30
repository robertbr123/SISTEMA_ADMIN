import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Verificar se o usuário está logado (por enquanto, depois implementar roles)
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }

    // Buscar estatísticas
    const [totalUsers, totalPlans, activeSubscriptions, totalRevenue] = await Promise.all([
      prisma.user.count(),
      prisma.subscription.findMany({ select: { planName: true } }).then(subs => new Set(subs.map(s => s.planName)).size),
      prisma.subscription.count({ where: { status: 'active' } }),
      prisma.invoice.aggregate({
        where: { status: 'paid' },
        _sum: { amount: true }
      })
    ])

    return NextResponse.json({
      totalUsers,
      totalPlans,
      activeSubscriptions,
      totalRevenue: totalRevenue._sum.amount || 0
    })

  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}