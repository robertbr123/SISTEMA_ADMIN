'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  UsersMetricCard,
  RevenueMetricCard,
  SubscriptionsMetricCard,
  PlansMetricCard,
  ConversionRateCard,
  ServerMetricCard,
  NetworkDevicesCard,
  SecurityCard
} from '@/components/admin/MetricCards'
import {
  MonthlyRevenueChart,
  PlanDistributionChart,
  InvoiceStatusChart,
  UserGrowthChart
} from '@/components/admin/Charts'

interface DashboardStats {
  totalUsers: number
  totalPlans: number
  activeSubscriptions: number
  totalRevenue: number
  recentUsers: number
  averageRevenuePerUser: number
  conversionRate: number
  monthlyRevenue: Array<{ month: string; revenue: number }>
  planDistribution: Array<{ name: string; value: number }>
  invoiceStats: Array<{ name: string; value: number; color: string }>
  infrastructure: {
    mikrotikDevices: number
    proxmoxServers: number
    networkDevices: number
  }
}

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/stats')
      
      if (!response.ok) {
        throw new Error('Erro ao carregar estatísticas')
      }
      
      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Erro</h2>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchStats}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
              <p className="text-gray-600 mt-1">Visão geral do sistema e métricas principais</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchStats}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Atualizar
              </button>
              <div className="text-sm text-gray-500">
                Última atualização: {new Date().toLocaleTimeString('pt-BR')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Métricas Principais */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Métricas Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <UsersMetricCard 
              value={stats.totalUsers}
              change={stats.recentUsers}
              changeLabel="novos esta semana"
            />
            <RevenueMetricCard 
              value={stats.totalRevenue}
              change={12.5}
              changeLabel="vs mês anterior"
            />
            <SubscriptionsMetricCard 
              value={stats.activeSubscriptions}
              change={8.2}
              changeLabel="vs mês anterior"
            />
            <ConversionRateCard 
              value={stats.conversionRate}
              change={3.1}
              changeLabel="vs mês anterior"
            />
          </div>
        </section>

        {/* Gráficos Principais */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Análise de Receita</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MonthlyRevenueChart 
              data={stats.monthlyRevenue}
              title="Receita Mensal"
              height={350}
            />
            <PlanDistributionChart 
              data={stats.planDistribution}
              title="Distribuição de Planos"
              height={350}
            />
          </div>
        </section>

        {/* Métricas Secundárias */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Infraestrutura</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PlansMetricCard 
              value={stats.totalPlans}
            />
            <ServerMetricCard 
              value={stats.infrastructure.proxmoxServers}
            />
            <NetworkDevicesCard 
              value={stats.infrastructure.mikrotikDevices}
            />
            <SecurityCard 
              value={stats.infrastructure.networkDevices}
            />
          </div>
        </section>

        {/* Análise Detalhada */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Análise Detalhada</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InvoiceStatusChart 
              data={stats.invoiceStats}
              title="Status das Faturas"
              height={350}
            />
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo Financeiro</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Receita Total</span>
                  <span className="font-semibold text-green-600">
                    R$ {stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Receita por Usuário</span>
                  <span className="font-semibold">
                    R$ {stats.averageRevenuePerUser.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Taxa de Conversão</span>
                  <span className="font-semibold text-blue-600">
                    {stats.conversionRate.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Assinaturas Ativas</span>
                  <span className="font-semibold">
                    {stats.activeSubscriptions} de {stats.totalUsers}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ações Rápidas */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/admin/usuarios"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Gerenciar Usuários</h3>
              <p className="text-sm text-gray-600">Visualizar e gerenciar todos os usuários</p>
            </a>
            <a
              href="/admin/planos"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Gerenciar Planos</h3>
              <p className="text-sm text-gray-600">Criar e editar planos de assinatura</p>
            </a>
            <a
              href="/admin/mikrotik"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Dispositivos Mikrotik</h3>
              <p className="text-sm text-gray-600">Monitorar e configurar dispositivos</p>
            </a>
            <a
              href="/admin/virtualizacao"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Virtualização</h3>
              <p className="text-sm text-gray-600">Gerenciar servidores Proxmox</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}