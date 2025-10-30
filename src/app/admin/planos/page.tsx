'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Plan {
  name: string
  price: number
  features: string[]
  count: number
}

export default function PlanosAdmin() {
  const { data: session, status } = useSession()
  const [plans, setPlans] = useState<Plan[]>([])
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

    fetchPlans()
  }, [session, status])

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/admin/plans')
      if (response.ok) {
        const data = await response.json()
        setPlans(data)
      }
    } catch (error) {
      console.error('Error fetching plans:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p>Carregando planos...</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gerenciar Planos</h1>
            <p className="text-xl text-gray-400">Visualize e edite todos os planos disponíveis</p>
          </div>
          <Link
            href="/admin/planos/novo"
            className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition-colors"
          >
            Criar Novo Plano
          </Link>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <span className="text-sm text-gray-400">{plan.count} usuários</span>
              </div>

              <p className="text-3xl font-bold text-red-600 mb-4">
                R$ {plan.price.toFixed(2)}<span className="text-lg">/mês</span>
              </p>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <span className="text-green-600 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex space-x-2">
                <button className="flex-1 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors">
                  Editar
                </button>
                <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        {plans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">Nenhum plano encontrado</p>
            <Link
              href="/admin/planos/novo"
              className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition-colors inline-block"
            >
              Criar Primeiro Plano
            </Link>
          </div>
        )}
    </div>
  )
}