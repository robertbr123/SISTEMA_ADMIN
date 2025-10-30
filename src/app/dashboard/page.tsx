'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  subscriptions: Subscription[]
}

interface Subscription {
  id: string
  planName: string
  price: number
  status: string
  invoices: Invoice[]
}

interface Invoice {
  id: string
  amount: number
  status: string
  dueDate: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    // Verificar se usuário está autenticado
    if (status === 'loading') return

    if (!session) {
      window.location.href = '/login'
      return
    }

    fetchUserData()
  }, [session, status])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.dropdown-container')) {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user')
      if (response.ok) {
        const data = await response.json()
        setUser(data)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p>Carregando...</p>
      </div>
    </div>
  )

  if (!user) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Erro ao carregar dados</h1>
        <a href="/" className="text-red-600 hover:text-red-700">Voltar ao início</a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:px-12">
        <Logo />
        <div className="flex items-center space-x-4">

          {/* Avatar Dropdown */}
          <div className="relative dropdown-container">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user ? getUserInitials(user.name) : 'U'}
              </div>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                <div className="py-2">
                  <Link
                    href="/dashboard/configuracoes"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Configurações
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false)
                      signOut()
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-8 px-4 md:px-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Olá, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-xl text-gray-400">
            Bem-vindo ao seu painel Linket
          </p>
        </div>

        {/* Subscription Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Plano Atual</h3>
            <p className="text-2xl font-bold text-red-600">
              {user.subscriptions[0]?.planName || 'Nenhum'}
            </p>
            <p className="text-sm text-gray-400">Internet de alta velocidade</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Valor Mensal</h3>
            <p className="text-2xl font-bold text-green-600">
              R$ {user.subscriptions[0]?.price.toFixed(2) || '0.00'}
            </p>
            <p className="text-sm text-gray-400">Próximo vencimento: 01/11/2025</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Status</h3>
            <p className={`text-2xl font-bold ${user.subscriptions[0]?.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
              {user.subscriptions[0]?.status === 'active' ? 'Ativo' : 'Inativo'}
            </p>
            <p className="text-sm text-gray-400">Pagamento em dia</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Uso de Dados</h3>
            <p className="text-2xl font-bold text-blue-600">45 GB</p>
            <p className="text-sm text-gray-400">de 100 GB ilimitado</p>
          </div>
        </div>

        {/* Plans Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Nossos Planos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plano Básico */}
            <div className="bg-gray-800 p-8 rounded-lg text-center hover:bg-gray-700 transition-colors">
              <h3 className="text-2xl font-bold mb-4">Básico</h3>
              <p className="text-4xl font-bold mb-4">R$ 49,90<span className="text-lg">/mês</span></p>
              <ul className="text-left mb-8 space-y-2 text-gray-300">
                <li>✓ Até 50 Mbps</li>
                <li>✓ Wi-Fi incluído</li>
                <li>✓ Suporte por chat</li>
                <li>✓ Instalação gratuita</li>
              </ul>
              <button className="bg-red-600 px-6 py-3 rounded hover:bg-red-700 inline-block w-full">
                Escolher Plano
              </button>
            </div>

            {/* Plano Premium */}
            <div className="bg-red-600 p-8 rounded-lg text-center text-white border-2 border-red-600">
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <p className="text-4xl font-bold mb-4">R$ 79,90<span className="text-lg">/mês</span></p>
              <ul className="text-left mb-8 space-y-2">
                <li>✓ Até 200 Mbps</li>
                <li>✓ Wi-Fi mesh</li>
                <li>✓ Suporte prioritário 24/7</li>
                <li>✓ Modem avançado</li>
                <li>✓ Sem limite de dados</li>
              </ul>
              <button className="bg-white text-red-600 px-6 py-3 rounded hover:bg-gray-100 inline-block w-full">
                Escolher Plano
              </button>
            </div>

            {/* Plano Ultra */}
            <div className="bg-gray-800 p-8 rounded-lg text-center hover:bg-gray-700 transition-colors">
              <h3 className="text-2xl font-bold mb-4">Ultra</h3>
              <p className="text-4xl font-bold mb-4">R$ 119,90<span className="text-lg">/mês</span></p>
              <ul className="text-left mb-8 space-y-2 text-gray-300">
                <li>✓ Até 500 Mbps</li>
                <li>✓ Wi-Fi 6</li>
                <li>✓ Suporte VIP</li>
                <li>✓ Roteador gamer</li>
                <li>✓ IP fixo opcional</li>
              </ul>
              <button className="bg-white text-red-600 px-6 py-3 rounded hover:bg-gray-100 inline-block w-full">
                Escolher Plano
              </button>
            </div>
          </div>
        </section>

        {/* Invoices */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Faturas</h2>
          {user.subscriptions[0]?.invoices.length ? (
            <div className="space-y-4">
              {user.subscriptions[0].invoices.map((invoice) => (
                <div key={invoice.id} className="flex justify-between items-center p-4 border border-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">Fatura {new Date(invoice.dueDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-400">Vencimento: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${invoice.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                      {invoice.status === 'paid' ? 'Paga' : 'Pendente'}
                    </p>
                    <button className="text-red-600 hover:text-red-700 text-sm">
                      Baixar PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Nenhuma fatura encontrada.</p>
          )}
        </div>
      </div>
    </div>
  )
}