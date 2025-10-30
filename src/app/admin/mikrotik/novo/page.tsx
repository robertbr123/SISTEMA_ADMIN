'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'

export default function NovoDispositivoMikrotik() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    ip: '',
    mac: '',
    username: 'admin',
    password: '',
    port: 8728
  })

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      window.location.href = '/login'
      return
    }

    if (session.user.role !== 'admin') {
      window.location.href = '/dashboard'
      return
    }
  }, [session, status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/mikrotik', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/mikrotik/dispositivos')
      } else {
        const error = await response.json()
        alert(error.error || 'Erro ao adicionar dispositivo')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Erro ao adicionar dispositivo')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'port' ? parseInt(value) || 8728 : value
    }))
  }

  if (loading && !session) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Carregando...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:px-12 border-b border-gray-800">
        <Logo />
        <div className="flex items-center space-x-4">
          <Link href="/admin/mikrotik/dispositivos" className="text-gray-300 hover:text-white">
            Voltar aos Dispositivos
          </Link>
          <Link href="/admin" className="text-gray-300 hover:text-white">
            Voltar ao Admin
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Adicionar Novo Dispositivo</h1>
          <p className="text-xl text-gray-400">Configure um novo dispositivo Mikrotik na sua rede</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome do Dispositivo *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Ex: Router Principal CCR1009"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Endereço IP *
              </label>
              <input
                type="text"
                name="ip"
                value={formData.ip}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="192.168.1.1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Endereço MAC (opcional)
              </label>
              <input
                type="text"
                name="mac"
                value={formData.mac}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="00:0C:42:1F:2A:3B"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Porta API
              </label>
              <input
                type="number"
                name="port"
                value={formData.port}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="8728"
                min="1"
                max="65535"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Usuário *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Digite a senha"
                required
              />
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded p-4">
            <h3 className="text-blue-400 font-semibold mb-2">ℹ️ Informações Importantes</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Certifique-se de que o dispositivo Mikrotik está acessível na rede</li>
              <li>• A API deve estar habilitada no dispositivo (IP → Services → API)</li>
              <li>• O usuário deve ter permissões para acessar a API</li>
              <li>• Porta padrão 8728 (sem SSL) ou 8729 (com SSL)</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adicionando...' : 'Adicionar Dispositivo'}
            </button>
            <Link
              href="/admin/mikrotik/dispositivos"
              className="flex-1 bg-gray-700 text-white py-3 px-4 rounded hover:bg-gray-600 transition-colors text-center"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}