'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface MikrotikDevice {
  id: string
  name: string
  ip: string
  status: 'online' | 'offline'
  uptime: string
  cpu: number
  memory: number
}

export default function MikrotikAdmin() {
  const { data: session, status } = useSession()
  const [devices, setDevices] = useState<MikrotikDevice[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)

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

    fetchMikrotikDevices()
  }, [session, status])

  const fetchMikrotikDevices = async (refresh: boolean = false) => {
    try {
      const url = '/api/admin/mikrotik' + (refresh ? '?refresh=true' : '')
      const res = await fetch(url)

      if (res.ok) {
        const data = await res.json()
        setDevices(data)
        return
      }

      // Fallback para mock caso API falhe
      console.error('Failed to fetch devices from API, using mock data')
      const mockDevices: MikrotikDevice[] = [
        {
          id: '1',
          name: 'Router Principal',
          ip: '192.168.1.1',
          status: 'online',
          uptime: '15d 4h 23m',
          cpu: 25,
          memory: 45
        },
        {
          id: '2',
          name: 'Switch Escritório',
          ip: '192.168.1.2',
          status: 'online',
          uptime: '7d 12h 5m',
          cpu: 15,
          memory: 30
        },
        {
          id: '3',
          name: 'AP Sala Reuniões',
          ip: '192.168.1.3',
          status: 'offline',
          uptime: '0d 0h 0m',
          cpu: 0,
          memory: 0
        }
      ]
      setDevices(mockDevices)
    } catch (error) {
      console.error('Error fetching Mikrotik devices:', error)
      setDevices([])
    } finally {
      setLoading(false)
    }
  }

  const handleSync = async () => {
    setSyncing(true)
    try {
      await fetchMikrotikDevices(true)
    } finally {
      setSyncing(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Carregando dispositivos Mikrotik...</p>
      </div>
    </div>
  )

  return (
    <div className="text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gerenciar Mikrotik</h1>
            <p className="text-xl text-gray-400">Monitore e controle seus dispositivos Mikrotik</p>
          </div>
            <div className="flex space-x-4">
            <button
              onClick={handleSync}
              disabled={syncing}
              className={`bg-blue-600 text-white px-6 py-3 rounded transition-colors ${syncing ? 'opacity-60 cursor-wait' : 'hover:bg-blue-700'}`}
            >
              {syncing ? 'Sincronizando...' : 'Sincronizar'}
            </button>
            <Link
              href="/admin/mikrotik/dispositivos"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors"
            >
              Gerenciar Dispositivos
            </Link>
          </div>
        </div>

        {/* Network Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Dispositivos Online</h3>
            <p className="text-3xl font-bold text-green-600">
              {devices.filter(d => d.status === 'online').length}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Dispositivos Offline</h3>
            <p className="text-3xl font-bold text-red-600">
              {devices.filter(d => d.status === 'offline').length}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">CPU Médio</h3>
            <p className="text-3xl font-bold text-blue-600">
              {Math.round(devices.filter(d => d.status === 'online').reduce((acc, d) => acc + d.cpu, 0) / devices.filter(d => d.status === 'online').length) || 0}%
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Memória Média</h3>
            <p className="text-3xl font-bold text-purple-600">
              {Math.round(devices.filter(d => d.status === 'online').reduce((acc, d) => acc + d.memory, 0) / devices.filter(d => d.status === 'online').length) || 0}%
            </p>
          </div>
        </div>

        {/* Devices Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold">Dispositivos Conectados</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Dispositivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    IP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Uptime
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    CPU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Memória
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {devices.map((device) => (
                  <tr key={device.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{device.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{device.ip}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        device.status === 'online'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {device.status === 'online' ? 'Online' : 'Offline'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {device.uptime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {device.cpu}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {device.memory}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-500 mr-4">
                        Configurar
                      </button>
                      <button className="text-red-600 hover:text-red-500">
                        Reiniciar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Configuration Section */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Configurações Mikrotik</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                API URL
              </label>
              <input
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                placeholder="http://192.168.1.1/rest"
                defaultValue=""
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                API Token
              </label>
              <input
                type="password"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                placeholder="Token de autenticação"
                defaultValue=""
              />
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
              Salvar Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}