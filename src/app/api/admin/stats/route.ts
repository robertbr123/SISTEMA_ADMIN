import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Verificar se o usuário está logado
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }

    // Buscar estatísticas básicas
    const [
      totalUsers, 
      activeSubscriptions,
      recentUsers,
      subscriptionsByPlan,
      usersByStatus
    ] = await Promise.all([
      // Estatísticas principais
      prisma.user.count(),
      prisma.subscription.count({ where: { status: 'active' } }),
      
      // Usuários recentes (últimos 7 dias)
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Assinaturas por plano
      prisma.subscription.groupBy({
        by: ['planName'],
        _count: { planName: true }
      }),
      
      // Usuários por status de atividade
      prisma.user.groupBy({
        by: ['createdAt'],
        _count: { id: true }
      })
    ])

    // Processamento de dados para gráficos
    const planDistribution = subscriptionsByPlan.map((plan: any) => ({
      name: plan.planName,
      value: plan._count.planName
    }))

    // Simular dados de infraestrutura (pode ser expandido com APIs reais)
    const mikrotikDevices = 12 // Pode vir de API real do Mikrotik
    const proxmoxServers = 3   // Pode vir de API real do Proxmox
    const activeConnections = 156 // Conexões ativas
    const domainCount = 45     // Domínios gerenciados
    const networkDevices = 28  // Dispositivos de rede
    const systemUptime = 99.8  // Uptime do sistema

    // Gráfico de atividade por semana
    const weeklyActivity = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' })
      
      weeklyActivity.push({
        day: dayName,
        connections: Math.floor(Math.random() * 50) + 20,
        devices: Math.floor(Math.random() * 10) + 5
      })
    }

    // Status dos serviços
    const serviceStatus = [
      { name: 'Mikrotik Online', value: mikrotikDevices - 1, color: '#10b981' },
      { name: 'Mikrotik Offline', value: 1, color: '#ef4444' },
      { name: 'Proxmox Ativo', value: proxmoxServers, color: '#3b82f6' },
      { name: 'Domínios Ativos', value: domainCount, color: '#8b5cf6' }
    ]

    return NextResponse.json({
      // Métricas principais
      totalUsers,
      activeSubscriptions,
      recentUsers,
      
      // Infraestrutura
      infrastructure: {
        mikrotikDevices,
        proxmoxServers,
        activeConnections,
        domainCount,
        networkDevices,
        systemUptime
      },
      
      // Dados para gráficos
      weeklyActivity,
      planDistribution,
      serviceStatus,
      
      // Métricas calculadas
      averageDevicesPerUser: totalUsers > 0 ? (mikrotikDevices / totalUsers).toFixed(1) : 0,
      systemHealth: systemUptime
    })

  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}