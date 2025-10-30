'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface MikrotikDevice {
  id: string
  name: string
  ip: string
  mac: string
  status: 'online' | 'offline'
  uptime: string
  cpu: number
  memory: number
  interfaces: number
  version: string
}

export default function MikrotikDevices() {
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
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setDevices(data)
      } else {
        console.error('Failed to fetch devices')
        setDevices([])
      }
    } catch (error) {
      console.error('Error fetching Mikrotik devices:', error)
      setDevices([])
    } finally {
      setLoading(false)
    }
  }

  const handleSyncAll = async () => {
    setSyncing(true)
    try {
      await fetchMikrotikDevices(true)
    } finally {
      setSyncing(false)
    }
  }

  if (loading) return (
    <div className="min-h-[50vh] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Carregando dispositivos Mikrotik...</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dispositivos Mikrotik</h1>
            <p className="text-xl text-gray-400">Gerencie todos os dispositivos da sua rede</p>
          </div>
            <div className="flex space-x-4">
            <Link
              href="/admin/mikrotik/novo"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
            >
              Adicionar Dispositivo
            </Link>
            <button
              onClick={handleSyncAll}
              disabled={syncing}
              className={`bg-green-600 text-white px-6 py-3 rounded transition-colors ${syncing ? 'opacity-60 cursor-wait' : 'hover:bg-green-700'}`}
            >
              {syncing ? 'Sincronizando...' : 'Sincronizar Todos'}
            </button>
          </div>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => (
            <div key={device.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{device.name}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  device.status === 'online'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {device.status === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">IP:</span>
                  <span className="text-white">{device.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">MAC:</span>
                  <span className="text-white font-mono text-xs">{device.mac}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime:</span>
                  <span className="text-white">{device.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">CPU:</span>
                  <span className="text-white">{device.cpu}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Memória:</span>
                  <span className="text-white">{device.memory}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Interfaces:</span>
                  <span className="text-white">{device.interfaces}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Versão:</span>
                  <span className="text-white">{device.version}</span>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <Link
                  href={`/admin/mikrotik/${device.id}`}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded text-sm hover:bg-blue-700 transition-colors text-center"
                >
                  Configurar
                </Link>
                <button className="flex-1 bg-gray-700 text-white py-2 px-4 rounded text-sm hover:bg-gray-600 transition-colors">
                  Logs
                </button>
                <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded text-sm hover:bg-red-700 transition-colors">
                  Reiniciar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Actions */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Ações em Massa</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 transition-colors">
              Atualizar Firmware
            </button>
            <button className="bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition-colors">
              Backup de Configuração
            </button>
            <button className="bg-yellow-600 text-white py-3 px-4 rounded hover:bg-yellow-700 transition-colors">
              Reiniciar Todos
            </button>
            <button className="bg-red-600 text-white py-3 px-4 rounded hover:bg-red-700 transition-colors">
              Desconectar Todos
            </button>
          </div>
        </div>
    </div>
  )
}