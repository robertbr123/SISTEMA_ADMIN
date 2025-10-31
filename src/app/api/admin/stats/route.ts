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

    // Buscar estatísticas de infraestrutura
    const [
      totalUsers, 
      activeUsers, 
      recentUsers,
      usersByDay
    ] = await Promise.all([
      // Estatísticas de usuários
      prisma.user.count(),
      prisma.user.count(), // TODO: implementar lógica de usuários ativos quando campo lastLogin existir
      
      // Usuários recentes (últimos 7 dias)
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Usuários por dia (últimos 7 dias)
      prisma.user.groupBy({
        by: ['createdAt'],
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        _count: { id: true }
      })
    ])

    // Dados simulados de infraestrutura (TODO: implementar dados reais)
    const mikrotikDevices = 5
    const proxmoxServers = 3
    const totalDomains = 24
    const networkDevices = mikrotikDevices + proxmoxServers + 8

    // Processamento de dados para gráficos
    const networkActivity = generateNetworkActivity()
    const weeklyUsers = processWeeklyUsers(usersByDay)
    const systemStatus = [
      { name: 'Mikrotik', status: 'online', count: mikrotikDevices, color: '#10b981' },
      { name: 'Proxmox', status: 'online', count: proxmoxServers, color: '#3b82f6' },
      { name: 'DNS', status: 'online', count: totalDomains, color: '#8b5cf6' },
      { name: 'Network', status: 'online', count: networkDevices, color: '#f59e0b' }
    ]

    const infrastructureHealth = [
      { name: 'Online', value: 95, color: '#10b981' },
      { name: 'Warning', value: 4, color: '#f59e0b' },
      { name: 'Offline', value: 1, color: '#ef4444' }
    ]

    return NextResponse.json({
      // Estrutura de infraestrutura esperada pelo dashboard
      infrastructure: {
        mikrotikDevices,
        proxmoxServers,
        networkDevices,
        domains: totalDomains,
        systemUptime: 99.5,
        networkLoad: 68,
        securityScore: 94,
        systemHealth: 97
      },
      
      // Dados para gráficos
      networkActivity,
      weeklyActivity: weeklyUsers,
      systemStatus: infrastructureHealth,
      systemPerformance: [
        { time: '00:00', cpu: 25, memory: 45, network: 30 },
        { time: '04:00', cpu: 30, memory: 48, network: 35 },
        { time: '08:00', cpu: 55, memory: 65, network: 60 },
        { time: '12:00', cpu: 70, memory: 75, network: 80 },
        { time: '16:00', cpu: 65, memory: 70, network: 75 },
        { time: '20:00', cpu: 45, memory: 55, network: 50 }
      ],
      
      // Métricas adicionais
      totalUsers,
      activeUsers,
      recentUsers,
      
      // Status geral do sistema
      overallHealth: {
        mikrotik: 'online',
        proxmox: 'online',
        dns: 'online',
        network: 'online'
      }
    })

  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

function generateNetworkActivity() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' })
    
    days.push({
      day: dayName,
      traffic: Math.floor(Math.random() * 1000) + 500, // GB
      connections: Math.floor(Math.random() * 500) + 200,
      uptime: 95 + Math.random() * 5 // 95-100%
    })
  }
  return days
}

function processWeeklyUsers(userData: any[]) {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' })
    
    const dayUsers = userData
      .filter(item => {
        const itemDate = new Date(item.createdAt)
        return itemDate.toDateString() === date.toDateString()
      })
      .reduce((sum, item) => sum + item._count.id, 0)
    
    days.push({
      day: dayName,
      devices: dayUsers + Math.floor(Math.random() * 5) + 10, // Simula dispositivos conectados
      users: dayUsers,
      active: Math.floor(dayUsers * 0.7) // estimativa de usuários ativos
    })
  }
  return days
}