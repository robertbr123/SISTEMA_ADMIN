'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  SystemUptimeCard,
  NetworkDevicesCard,
  SecurityCard,
  DomainsCard,
  MikrotikDevicesCard,
  ProxmoxServersCard,
  SystemHealthCard,
  NetworkLoadCard
} from '@/components/admin/MetricCards'
import {
  WeeklyActivityChart,
  SystemMonitorChart,
  NetworkActivityChart,
  SystemStatusChart
} from '@/components/admin/Charts'

interface DashboardStats {
  infrastructure: {
    mikrotikDevices: number
    proxmoxServers: number
    networkDevices: number
    domains: number
    systemUptime: number
    networkLoad: number
    securityScore: number
    systemHealth: number
  }
  networkActivity: Array<{ day: string; traffic: number; connections: number }>
  systemPerformance: Array<{ time: string; cpu: number; memory: number; network: number }>
  systemStatus: Array<{ name: string; value: number; color: string }>
  weeklyActivity: Array<{ day: string; devices: number }>
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
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-900 border border-red-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-300 mb-2">Erro</h2>
            <p className="text-red-200">{error}</p>
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
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard de Infraestrutura</h1>
              <p className="text-gray-300 mt-1">Monitoramento em tempo real dos sistemas</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchStats}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Atualizar
              </button>
              <div className="text-sm text-gray-400">
                Última atualização: {new Date().toLocaleTimeString('pt-BR')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Métricas Principais de Infraestrutura */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Status da Infraestrutura</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MikrotikDevicesCard 
              value={stats.infrastructure.mikrotikDevices}
              change={2}
              changeLabel="novos esta semana"
            />
            <ProxmoxServersCard 
              value={stats.infrastructure.proxmoxServers}
              change={0}
              changeLabel="servidores online"
            />
            <DomainsCard 
              value={stats.infrastructure.domains}
              change={5}
              changeLabel="novos domínios"
            />
            <SystemUptimeCard 
              value={stats.infrastructure.systemUptime}
              change={0.1}
              changeLabel="vs último mês"
            />
          </div>
        </section>

        {/* Gráficos de Monitoramento */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Monitoramento de Rede</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeeklyActivityChart 
              data={stats.weeklyActivity}
              title="Atividade Semanal de Dispositivos"
              height={350}
            />
            <NetworkActivityChart 
              data={stats.networkActivity}
              title="Tráfego de Rede"
              height={350}
            />
          </div>
        </section>

        {/* Métricas de Performance */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Performance do Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <NetworkLoadCard 
              value={stats.infrastructure.networkLoad}
              change={-5.2}
              changeLabel="vs hora anterior"
            />
            <SecurityCard 
              value={stats.infrastructure.securityScore}
              change={2.1}
              changeLabel="score de segurança"
            />
            <SystemHealthCard 
              value={stats.infrastructure.systemHealth}
              change={1.5}
              changeLabel="saúde geral"
            />
            <NetworkDevicesCard 
              value={stats.infrastructure.networkDevices}
              change={3}
              changeLabel="dispositivos conectados"
            />
          </div>
        </section>

        {/* Análise Detalhada */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Análise Detalhada</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SystemStatusChart 
              data={stats.systemStatus}
              title="Status dos Sistemas"
              height={350}
            />
            <SystemMonitorChart 
              data={stats.systemPerformance}
              title="Performance em Tempo Real"
              height={350}
            />
          </div>
        </section>

        {/* Resumo da Infraestrutura */}
        <section className="mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-white mb-4">Resumo da Infraestrutura</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {stats.infrastructure.mikrotikDevices}
                </div>
                <div className="text-sm text-gray-400">Dispositivos Mikrotik</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {stats.infrastructure.proxmoxServers}
                </div>
                <div className="text-sm text-gray-400">Servidores Proxmox</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {stats.infrastructure.domains}
                </div>
                <div className="text-sm text-gray-400">Domínios Gerenciados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {stats.infrastructure.systemUptime.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">Uptime do Sistema</div>
              </div>
            </div>
          </div>
        </section>

        {/* Ações Rápidas */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/admin/mikrotik"
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-white mb-2">Gerenciar Mikrotik</h3>
              <p className="text-sm text-gray-400">Configurar dispositivos de rede</p>
            </a>
            <a
              href="/admin/virtualizacao"
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-purple-500 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-white mb-2">Proxmox</h3>
              <p className="text-sm text-gray-400">Gerenciar máquinas virtuais</p>
            </a>
            <a
              href="/admin/dominios"
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-green-500 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-white mb-2">Domínios</h3>
              <p className="text-sm text-gray-400">Gerenciar domínios e DNS</p>
            </a>
            <a
              href="/admin/rede"
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-yellow-500 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-white mb-2">Rede</h3>
              <p className="text-sm text-gray-400">Monitorar infraestrutura de rede</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}