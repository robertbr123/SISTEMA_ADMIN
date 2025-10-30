'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Logo from '@/components/Logo'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        alert('Credenciais inválidas')
      } else {
        window.location.href = '/dashboard'
      }
    } catch (error) {
      alert('Erro no login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:px-12">
        <Logo />
        <div className="flex items-center space-x-4">
          <a href="/registro" className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
            Registrar-se
          </a>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="max-w-md w-full bg-black bg-opacity-80 p-8 rounded-lg border border-gray-800">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Entrar</h1>
            <p className="text-gray-400">Bem-vindo de volta à Linket</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              Novo na Linket?{' '}
              <a href="/registro" className="text-red-600 hover:text-red-700 font-semibold">
                Crie sua conta
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}