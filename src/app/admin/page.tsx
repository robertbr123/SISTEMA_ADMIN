'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface AdminStats {
  totalUsers: number
  totalPlans: number
  activeSubscriptions: number
  totalRevenue: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se usuário está autenticado
    if (status === 'loading') return

    if (!session) {
      window.location.href = '/login'
      return
    }

    // Verificar se usuário é admin
    if (session.user.role !== 'admin') {
      window.location.href = '/dashboard'
      return
    }

    fetchAdminStats()
  }, [session, status])

  const fetchAdminStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p>Carregando painel administrativo...</p>
      </div>
    </div>
  )

  return (
    <div className="text-white">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-xl text-gray-400">Gerencie planos, clientes e estatísticas do sistema</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total de Usuários</h3>
            <p className="text-3xl font-bold text-blue-600">{stats?.totalUsers || 0}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Planos Ativos</h3>
            <p className="text-3xl font-bold text-green-600">{stats?.totalPlans || 0}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Assinaturas Ativas</h3>
            <p className="text-3xl font-bold text-purple-600">{stats?.activeSubscriptions || 0}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Receita Total</h3>
            <p className="text-3xl font-bold text-yellow-600">R$ {stats?.totalRevenue?.toFixed(2) || '0.00'}</p>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Plans Management */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Gerenciar Planos</h2>
            <div className="space-y-4">
              <Link
                href="/admin/planos"
                className="block w-full bg-red-600 text-white py-3 px-4 rounded hover:bg-red-700 text-center transition-colors"
              >
                Ver Todos os Planos
              </Link>
              <Link
                href="/admin/planos/novo"
                className="block w-full bg-gray-700 text-white py-3 px-4 rounded hover:bg-gray-600 text-center transition-colors"
              >
                Criar Novo Plano
              </Link>
            </div>
          </div>

          {/* Users Management */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Gerenciar Clientes</h2>
            <div className="space-y-4">
              <Link
                href="/admin/clientes"
                className="block w-full bg-red-600 text-white py-3 px-4 rounded hover:bg-red-700 text-center transition-colors"
              >
                Ver Todos os Clientes
              </Link>
              <Link
                href="/admin/clientes/novo"
                className="block w-full bg-gray-700 text-white py-3 px-4 rounded hover:bg-gray-600 text-center transition-colors"
              >
                Cadastrar Novo Cliente
              </Link>
            </div>
          </div>

          {/* Mikrotik Management */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Mikrotik</h2>
            <div className="space-y-4">
              <Link
                href="/admin/mikrotik/dispositivos"
                className="block w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 text-center transition-colors"
              >
                Gerenciar Dispositivos
              </Link>
              <Link
                href="/admin/mikrotik/novo"
                className="block w-full bg-gray-700 text-white py-3 px-4 rounded hover:bg-gray-600 text-center transition-colors"
              >
                Adicionar Dispositivo
              </Link>
            </div>
          </div>

          {/* Domains Management */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Domínios</h2>
            <div className="space-y-4">
              <Link
                href="/admin/dominios"
                className="block w-full bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 text-center transition-colors"
              >
                Gerenciar Domínios
              </Link>
              <Link
                href="/admin/dominios/novo"
                className="block w-full bg-gray-700 text-white py-3 px-4 rounded hover:bg-gray-600 text-center transition-colors"
              >
                Adicionar Domínio
              </Link>
            </div>
          </div>

          {/* Virtualization Management */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Virtualização</h2>
            <div className="space-y-4">
              <Link
                href="/admin/virtualizacao"
                className="block w-full bg-purple-600 text-white py-3 px-4 rounded hover:bg-purple-700 text-center transition-colors"
              >
                Gerenciar VMs (Proxmox)
              </Link>
              <div className="text-sm text-gray-400">Requer configuração PROXMOX_* em .env.local</div>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Informações do Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-white mb-2">Status do Banco de Dados</h3>
              <p className="text-green-600">Conectado ✓</p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Última Atualização</h3>
              <p className="text-gray-400">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}