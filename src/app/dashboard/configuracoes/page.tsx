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

export default function Configuracoes() {
  const { data: session } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })
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
        setEditData({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          zipCode: data.zipCode || ''
        })
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

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      })
      if (response.ok) {
        await fetchUserData()
        setEditing(false)
      } else {
        alert('Erro ao salvar')
      }
    } catch (error) {
      alert('Erro ao salvar')
    }
  }

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      zipCode: user?.zipCode || ''
    })
    setEditing(false)
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
      <p>Erro ao carregar dados do usuário.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-black border-b border-gray-800">
        <Link href="/dashboard">
          <Logo />
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-gray-300 hover:text-white">
            Dashboard
          </Link>

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
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-700 hover:text-red-700 transition-colors"
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

      <div className="max-w-4xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Configurações da Conta</h1>
          <p className="text-gray-400">Gerencie suas informações pessoais e preferências</p>
        </div>

        {/* Account Settings */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Informações Pessoais</h2>
          {editing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Endereço</label>
                <input
                  type="text"
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cidade</label>
                  <input
                    type="text"
                    value={editData.city}
                    onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
                  <input
                    type="text"
                    value={editData.state}
                    onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">CEP</label>
                <input
                  type="text"
                  value={editData.zipCode}
                  onChange={(e) => setEditData({ ...editData, zipCode: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-4">
                <button onClick={handleSave} className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700">
                  Salvar
                </button>
                <button onClick={handleCancel} className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700">
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-white mb-4">Informações Pessoais</h3>
                <p className="text-sm text-gray-300 mb-2">Nome: {user.name}</p>
                <p className="text-sm text-gray-300 mb-2">Email: {user.email}</p>
                <p className="text-sm text-gray-300 mb-2">Telefone: {user.phone || 'Não informado'}</p>
                <p className="text-sm text-gray-300 mb-2">Endereço: {user.address || 'Não informado'}</p>
                <p className="text-sm text-gray-300 mb-2">Cidade: {user.city || 'Não informado'}</p>
                <p className="text-sm text-gray-300 mb-2">Estado: {user.state || 'Não informado'}</p>
                <p className="text-sm text-gray-300 mb-2">CEP: {user.zipCode || 'Não informado'}</p>
                <button onClick={handleEdit} className="mt-4 text-red-600 hover:text-red-700">
                  Editar informações
                </button>
              </div>
              <div>
                <h3 className="font-medium text-white mb-4">Método de Pagamento</h3>
                <p className="text-sm text-gray-300 mb-4">Cartão **** **** **** 1234</p>
                <button className="text-red-600 hover:text-red-700">
                  Alterar método de pagamento
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}