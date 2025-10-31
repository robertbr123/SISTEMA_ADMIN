'use client'

import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
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

export default function ClientDashboard() {
  const { data: session } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    fetchUserData()
  }, [])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Erro ao carregar dados</h1>
          <p className="mb-4">Não foi possível carregar suas informações</p>
          <a href="/" className="text-red-600 hover:text-red-700">Voltar ao início</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Logo />
              <span className="ml-2 text-xl font-bold text-white">Sistema de Assinaturas</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative dropdown-container">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {getUserInitials(user.name)}
                  </div>
                  <span className="hidden md:block">{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-700">
                    <div className="py-1">
                      <Link href="/dashboard/configuracoes" className="block px-4 py-2 text-sm hover:bg-gray-700">
                        Configurações
                      </Link>
                      <button 
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                      >
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Bem-vindo, {user.name}!</h1>
          <p className="text-gray-400 mt-2">Gerencie suas assinaturas e acompanhe suas faturas</p>
        </div>

        {/* Subscription Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {user.subscriptions.map((subscription) => (
            <div key={subscription.id} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{subscription.planName}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  subscription.status === 'active' 
                    ? 'bg-green-600 text-green-100'
                    : subscription.status === 'pending'
                    ? 'bg-yellow-600 text-yellow-100'
                    : 'bg-red-600 text-red-100'
                }`}>
                  {subscription.status === 'active' ? 'Ativo' : 
                   subscription.status === 'pending' ? 'Pendente' : 'Inativo'}
                </span>
              </div>
              
              <div className="text-2xl font-bold mb-4">
                R$ {subscription.price.toFixed(2)}<span className="text-sm text-gray-400">/mês</span>
              </div>
              
              <div className="text-sm text-gray-400">
                {subscription.invoices.length} fatura(s)
              </div>
            </div>
          ))}
          
          {user.subscriptions.length === 0 && (
            <div className="col-span-full bg-gray-900 p-8 rounded-lg border border-gray-800 text-center">
              <h3 className="text-xl font-semibold mb-2">Nenhuma assinatura encontrada</h3>
              <p className="text-gray-400 mb-4">Você ainda não possui nenhuma assinatura ativa</p>
              <Link 
                href="/planos" 
                className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Ver Planos Disponíveis
              </Link>
            </div>
          )}
        </div>

        {/* Recent Invoices */}
        <div className="bg-gray-900 rounded-lg border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold">Faturas Recentes</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4">Data de Vencimento</th>
                  <th className="text-left p-4">Plano</th>
                  <th className="text-left p-4">Valor</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {user.subscriptions.flatMap(sub => 
                  sub.invoices.map(invoice => (
                    <tr key={invoice.id} className="border-b border-gray-800 hover:bg-gray-800">
                      <td className="p-4">
                        {new Date(invoice.dueDate).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="p-4">{sub.planName}</td>
                      <td className="p-4">R$ {invoice.amount.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          invoice.status === 'paid' 
                            ? 'bg-green-600 text-green-100'
                            : invoice.status === 'pending'
                            ? 'bg-yellow-600 text-yellow-100'
                            : 'bg-red-600 text-red-100'
                        }`}>
                          {invoice.status === 'paid' ? 'Pago' : 
                           invoice.status === 'pending' ? 'Pendente' : 'Vencido'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
                
                {user.subscriptions.flatMap(sub => sub.invoices).length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-400">
                      Nenhuma fatura encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/planos" className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-red-600 transition-colors">
            <h3 className="text-lg font-semibold mb-2">Ver Planos</h3>
            <p className="text-gray-400">Explore nossos planos de assinatura</p>
          </Link>
          
          <Link href="/dashboard/configuracoes" className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-red-600 transition-colors">
            <h3 className="text-lg font-semibold mb-2">Configurações</h3>
            <p className="text-gray-400">Atualize suas informações pessoais</p>
          </Link>
          
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold mb-2">Suporte</h3>
            <p className="text-gray-400">Entre em contato conosco para ajuda</p>
          </div>
        </div>
      </main>
    </div>
  )
}