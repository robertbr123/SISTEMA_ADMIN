import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Planos pré-definidos (em produção, isso viria do banco)
const predefinedPlans = [
  {
    name: 'Básico',
    price: 49.90,
    features: ['Até 50 Mbps', 'Wi-Fi incluído', 'Suporte por chat', 'Instalação gratuita']
  },
  {
    name: 'Premium',
    price: 79.90,
    features: ['Até 100 Mbps', 'Wi-Fi incluído', 'Suporte prioritário', 'Instalação gratuita', 'Modem incluído']
  },
  {
    name: 'Ultra',
    price: 99.90,
    features: ['Até 200 Mbps', 'Wi-Fi incluído', 'Suporte 24/7', 'Instalação gratuita', 'Modem incluído', 'Backup de internet']
  }
]

export async function GET(request: NextRequest) {
  try {
    // Verificar se o usuário está logado
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }

    // Buscar contagem de usuários por plano
    const planCounts = await prisma.subscription.groupBy({
      by: ['planName'],
      _count: {
        planName: true
      }
    })

    // Combinar planos pré-definidos com contagens
    const plansWithCounts = predefinedPlans.map(plan => {
      const countData = planCounts.find(p => p.planName === plan.name)
      return {
        ...plan,
        count: countData?._count.planName || 0
      }
    })

    return NextResponse.json(plansWithCounts)

  } catch (error) {
    console.error('Error fetching plans:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}