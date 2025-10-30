'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import Logo from '@/components/Logo'

interface MikrotikDevice {
  id: string
  name: string
  ip: string
  mac: string
  username: string
  password: string
  port: number
  status: string
  model?: string
  version?: string
  uptime?: string
  cpu?: number
  memory?: number
  interfaces?: number
  lastSeen?: string
}

interface SystemInfo {
  model: string
  version: string
  uptime: string
  cpuLoad: number
  freeMemory: number
  totalMemory: number
  freeHddSpace: number
  totalHddSpace: number
}

interface InterfaceInfo {
  id: string
  name: string
  type: string
  macAddress?: string
  status: string
  rxByte: number
  txByte: number
}

interface LogEntry {
  time: string
  message: string
}

interface PPPConnection {
  id: string
  name: string
  service: string
  callerId: string
  address: string
  uptime: string
  encoding: string
  sessionId: string
  [key: string]: any // Allow additional properties from RouterOS
}

interface PPPSecret {
  id: string
  name: string
  service: string
  callerId: string
  password: string
  profile: string
  routes: string
  comment?: string
  [key: string]: any // Allow additional properties from RouterOS
}

interface BackupFile {
  name: string
  size: number
  creationTime: string
}

export default function EditarDispositivoMikrotik() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const deviceId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [monitoring, setMonitoring] = useState(false)
  const [backingUp, setBackingUp] = useState(false)
  const [activeTab, setActiveTab] = useState<'edit' | 'monitor' | 'backup'>('edit')
  const [monitorSubTab, setMonitorSubTab] = useState<'system' | 'interfaces' | 'ppp' | 'logs' | 'secrets'>('system')
  const [formData, setFormData] = useState({
    name: '',
    ip: '',
    mac: '',
    username: '',
    password: '',
    port: 8728
  })

  // Monitoring data
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)
  const [interfaces, setInterfaces] = useState<InterfaceInfo[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [pppConnections, setPppConnections] = useState<PPPConnection[]>([])
  const [pppSecrets, setPppSecrets] = useState<PPPSecret[]>([])
  const [backups, setBackups] = useState<BackupFile[]>([])
  const [lastMonitorUpdate, setLastMonitorUpdate] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null)

  // Modal states
  const [showAddSecretModal, setShowAddSecretModal] = useState(false)
  const [addingSecret, setAddingSecret] = useState(false)
  const [removingConnection, setRemovingConnection] = useState<string | null>(null)

  // Secret form data
  const [secretFormData, setSecretFormData] = useState({
    name: '',
    password: '',
    service: 'pppoe',
    profile: 'default',
    callerId: '',
    routes: '',
    comment: ''
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

    fetchDevice()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status, deviceId])

  // Load backups when backup tab is selected
  useEffect(() => {
    if (activeTab === 'backup' && !loading) {
      loadBackups()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, loading])

  const fetchDevice = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/mikrotik/${deviceId}`)
      if (response.ok) {
        const device: MikrotikDevice = await response.json()
        setFormData({
          name: device.name,
          ip: device.ip,
          mac: device.mac || '',
          username: device.username,
          password: device.password,
          port: device.port
        })
      } else {
        alert('Dispositivo não encontrado')
        router.push('/admin/mikrotik/dispositivos')
      }
    } catch (error) {
      console.error('Error fetching device:', error)
      alert('Erro ao carregar dispositivo')
    } finally {
      setLoading(false)
    }
  }, [deviceId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/admin/mikrotik/${deviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/mikrotik/dispositivos')
      } else {
        const error = await response.json()
        alert(error.error || 'Erro ao atualizar dispositivo')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Erro ao atualizar dispositivo')
    } finally {
      setSaving(false)
    }
  }

  const handleTestConnection = async () => {
    setTesting(true)
    try {
      const response = await fetch(`/api/admin/mikrotik/${deviceId}/monitor`)
      const data = await response.json()

      if (response.ok && data.connected) {
        alert('Conexão bem-sucedida! Dados de monitoramento atualizados.')
        setSystemInfo(data.systemInfo)
        setInterfaces(data.interfaces)
        setLogs(data.logs)
        setPppConnections(data.pppConnections || [])
        setPppSecrets(data.pppSecrets || [])
        setLastMonitorUpdate(data.timestamp)
        setConnectionStatus(true)
        setActiveTab('monitor')
        setMonitorSubTab('system')
      } else {
        alert('Falha na conexão: ' + (data.error || 'Dispositivo inacessível'))
        setConnectionStatus(false)
      }
    } catch (error) {
      console.error('Error testing connection:', error)
      alert('Erro ao testar conexão')
      setConnectionStatus(false)
    } finally {
      setTesting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja remover este dispositivo?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/mikrotik/${deviceId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin/mikrotik/dispositivos')
      } else {
        const error = await response.json()
        alert(error.error || 'Erro ao remover dispositivo')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Erro ao remover dispositivo')
    }
  }

  const handleCreateBackup = async () => {
    const filename = prompt('Digite o nome do arquivo de backup (opcional):')
    if (filename === null) return // User cancelled

    setBackingUp(true)
    try {
      const response = await fetch(`/api/admin/mikrotik/${deviceId}/backup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: filename || undefined }),
      })

      const data = await response.json()

      if (response.ok) {
        alert(`Backup criado com sucesso: ${data.filename}`)
        loadBackups() // Reload backup list
      } else {
        alert('Erro ao criar backup: ' + (data.error || 'Erro desconhecido'))
      }
    } catch (error) {
      console.error('Error creating backup:', error)
      alert('Erro ao criar backup')
    } finally {
      setBackingUp(false)
    }
  }

  const loadBackups = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/mikrotik/${deviceId}/backup`)
      const data = await response.json()

      if (response.ok) {
        setBackups(data.backups)
      } else {
        console.error('Error loading backups:', data.error)
      }
    } catch (error) {
      console.error('Error loading backups:', error)
    }
  }, [deviceId])

  const handleAddSecret = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddingSecret(true)

    try {
      const response = await fetch(`/api/admin/mikrotik/${deviceId}/secrets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(secretFormData),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Secret PPP adicionado com sucesso!')
        setShowAddSecretModal(false)
        setSecretFormData({
          name: '',
          password: '',
          service: 'pppoe',
          profile: 'default',
          callerId: '',
          routes: '',
          comment: ''
        })
        // Refresh monitoring data
        handleTestConnection()
      } else {
        alert('Erro ao adicionar secret: ' + (data.error || 'Erro desconhecido'))
      }
    } catch (error) {
      console.error('Error adding secret:', error)
      alert('Erro ao adicionar secret')
    } finally {
      setAddingSecret(false)
    }
  }

  const handleRemoveConnection = async (connectionId: string) => {
    if (!confirm('Tem certeza que deseja remover esta conexão PPP?')) {
      return
    }

    setRemovingConnection(connectionId)

    try {
      const response = await fetch(`/api/admin/mikrotik/${deviceId}/ppp?connectionId=${encodeURIComponent(connectionId)}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        alert('Conexão PPP removida com sucesso!')
        // Refresh monitoring data
        handleTestConnection()
      } else {
        alert('Erro ao remover conexão: ' + (data.error || 'Erro desconhecido'))
      }
    } catch (error) {
      console.error('Error removing connection:', error)
      alert('Erro ao remover conexão')
    } finally {
      setRemovingConnection(null)
    }
  }

  const handleSecretFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSecretFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatUptime = (uptime: string) => {
    // Mikrotik uptime format: "1w2d3h4m5s"
    return uptime
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'port' ? parseInt(value) || 8728 : value
    }))
  }

  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Carregando dispositivo...</p>
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

      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Gerenciar Dispositivo</h1>
          <p className="text-xl text-gray-400">Configure e monitore seu dispositivo Mikrotik</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'edit'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Configurações
            </button>
            <button
              onClick={() => setActiveTab('monitor')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'monitor'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Monitoramento
            </button>
            <button
              onClick={() => setActiveTab('backup')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'backup'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Backup
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'edit' && (
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
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </button>

              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testing}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {testing ? 'Testando...' : 'Testar Conexão'}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded hover:bg-red-700 transition-colors"
              >
                Remover Dispositivo
              </button>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded p-4">
              <h3 className="text-blue-400 font-semibold mb-2">ℹ️ Informações Importantes</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Teste a conexão antes de salvar para verificar se as credenciais estão corretas</li>
                <li>• Alterações no IP podem afetar outros dispositivos na rede</li>
                <li>• A remoção do dispositivo é permanente e não pode ser desfeita</li>
              </ul>
            </div>
          </form>
        )}

        {activeTab === 'monitor' && (
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Status da Conexão</h2>
                <button
                  onClick={handleTestConnection}
                  disabled={testing}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {testing ? 'Atualizando...' : 'Atualizar'}
                </button>
              </div>

              {connectionStatus !== null && (
                <div className={`p-4 rounded ${connectionStatus ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'}`}>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${connectionStatus ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={connectionStatus ? 'text-green-400' : 'text-red-400'}>
                      {connectionStatus ? 'Conectado' : 'Desconectado'}
                    </span>
                  </div>
                  {lastMonitorUpdate && (
                    <p className="text-sm text-gray-400 mt-2">
                      Última atualização: {new Date(lastMonitorUpdate).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Monitor Sub-tabs */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="mb-6">
                <div className="flex space-x-1 bg-gray-700 p-1 rounded-lg">
                  <button
                    onClick={() => setMonitorSubTab('system')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      monitorSubTab === 'system'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    Sistema
                  </button>
                  <button
                    onClick={() => setMonitorSubTab('interfaces')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      monitorSubTab === 'interfaces'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    Interfaces
                  </button>
                  <button
                    onClick={() => setMonitorSubTab('ppp')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      monitorSubTab === 'ppp'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    PPP
                  </button>
                  <button
                    onClick={() => setMonitorSubTab('logs')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      monitorSubTab === 'logs'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    Logs
                  </button>
                  <button
                    onClick={() => setMonitorSubTab('secrets')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      monitorSubTab === 'secrets'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    Secrets
                  </button>
                </div>
              </div>

              {/* System Information */}
              {monitorSubTab === 'system' && systemInfo && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Informações do Sistema</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-700 p-4 rounded">
                      <h3 className="text-sm font-medium text-gray-400">Modelo</h3>
                      <p className="text-lg font-semibold">{systemInfo.model}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded">
                      <h3 className="text-sm font-medium text-gray-400">Versão</h3>
                      <p className="text-lg font-semibold">{systemInfo.version}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded">
                      <h3 className="text-sm font-medium text-gray-400">Uptime</h3>
                      <p className="text-lg font-semibold">{formatUptime(systemInfo.uptime)}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded">
                      <h3 className="text-sm font-medium text-gray-400">CPU</h3>
                      <p className="text-lg font-semibold">{systemInfo.cpuLoad.toFixed(1)}%</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded">
                      <h3 className="text-sm font-medium text-gray-400">Memória Livre</h3>
                      <p className="text-lg font-semibold">{formatBytes(systemInfo.freeMemory)}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded">
                      <h3 className="text-sm font-medium text-gray-400">Memória Total</h3>
                      <p className="text-lg font-semibold">{formatBytes(systemInfo.totalMemory)}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded">
                      <h3 className="text-sm font-medium text-gray-400">HD Livre</h3>
                      <p className="text-lg font-semibold">{formatBytes(systemInfo.freeHddSpace)}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded">
                      <h3 className="text-sm font-medium text-gray-400">HD Total</h3>
                      <p className="text-lg font-semibold">{formatBytes(systemInfo.totalHddSpace)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Interfaces */}
              {monitorSubTab === 'interfaces' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Interfaces</h2>
                  {interfaces.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-2">Nome</th>
                            <th className="text-left py-2">Tipo</th>
                            <th className="text-left py-2">MAC</th>
                            <th className="text-left py-2">Status</th>
                            <th className="text-right py-2">RX</th>
                            <th className="text-right py-2">TX</th>
                          </tr>
                        </thead>
                        <tbody>
                          {interfaces.map((iface) => (
                            <tr key={iface.id} className="border-b border-gray-700">
                              <td className="py-2">{iface.name}</td>
                              <td className="py-2">{iface.type}</td>
                              <td className="py-2">{iface.macAddress || '-'}</td>
                              <td className="py-2">
                                <span className={`px-2 py-1 rounded text-xs ${iface.status === 'up' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                                  {iface.status}
                                </span>
                              </td>
                              <td className="py-2 text-right">{formatBytes(iface.rxByte)}</td>
                              <td className="py-2 text-right">{formatBytes(iface.txByte)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-400">Nenhuma interface encontrada.</p>
                  )}
                </div>
              )}

              {/* PPP Connections */}
              {monitorSubTab === 'ppp' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Conexões PPP Ativas</h2>
                  {pppConnections.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-2">Nome</th>
                            <th className="text-left py-2">Serviço</th>
                            <th className="text-left py-2">Caller ID</th>
                            <th className="text-left py-2">Endereço</th>
                            <th className="text-left py-2">Uptime</th>
                            <th className="text-left py-2">Encoding</th>
                            <th className="text-left py-2">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pppConnections.map((conn, index) => (
                            <tr key={index} className="border-b border-gray-700">
                              <td className="py-2">{conn.name || conn['user'] || '-'}</td>
                              <td className="py-2">{conn.service || '-'}</td>
                              <td className="py-2">{conn.callerId || conn['caller-id'] || '-'}</td>
                              <td className="py-2">{conn.address || '-'}</td>
                              <td className="py-2">{conn.uptime || '-'}</td>
                              <td className="py-2">{conn.encoding || '-'}</td>
                              <td className="py-2">
                                <button
                                  onClick={() => handleRemoveConnection(conn['.id'] || conn.id || conn.name)}
                                  disabled={removingConnection === (conn['.id'] || conn.id || conn.name)}
                                  className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {removingConnection === (conn['.id'] || conn.id || conn.name) ? 'Removendo...' : 'Remover'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-400">Nenhuma conexão PPP ativa encontrada.</p>
                  )}
                </div>
              )}

              {/* Logs */}
              {monitorSubTab === 'logs' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Logs Recentes</h2>
                  {logs.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {logs.map((log, index) => (
                        <div key={index} className="bg-gray-700 p-3 rounded text-sm">
                          <span className="text-gray-400">{log.time}</span>
                          <span className="ml-4 text-gray-300">{log.message}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">Nenhum log encontrado.</p>
                  )}
                </div>
              )}

              {/* PPP Secrets */}
              {monitorSubTab === 'secrets' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Secrets PPP</h2>
                    <button
                      onClick={() => setShowAddSecretModal(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      Adicionar Secret
                    </button>
                  </div>
                  {pppSecrets.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-2">Nome</th>
                            <th className="text-left py-2">Serviço</th>
                            <th className="text-left py-2">Caller ID</th>
                            <th className="text-left py-2">Perfil</th>
                            <th className="text-left py-2">Rotas</th>
                            <th className="text-left py-2">Comentário</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pppSecrets.map((secret, index) => (
                            <tr key={index} className="border-b border-gray-700">
                              <td className="py-2">{secret.name || '-'}</td>
                              <td className="py-2">{secret.service || '-'}</td>
                              <td className="py-2">{secret.callerId || secret['caller-id'] || '-'}</td>
                              <td className="py-2">{secret.profile || '-'}</td>
                              <td className="py-2">{secret.routes || '-'}</td>
                              <td className="py-2">{secret.comment || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-400">Nenhum secret PPP encontrado.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'backup' && (
          <div className="space-y-6">
            {/* Create Backup */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Criar Backup</h2>
              <p className="text-gray-400 mb-4">
                Crie um backup da configuração atual do dispositivo Mikrotik.
              </p>
              <button
                onClick={handleCreateBackup}
                disabled={backingUp}
                className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {backingUp ? 'Criando Backup...' : 'Criar Backup'}
              </button>
            </div>

            {/* Backup Files */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Arquivos de Backup</h2>
              {backups.length > 0 ? (
                <div className="space-y-2">
                  {backups.map((backup, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 p-4 rounded">
                      <div>
                        <h3 className="font-medium">{backup.name}</h3>
                        <p className="text-sm text-gray-400">
                          Criado em: {new Date(backup.creationTime).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">{formatBytes(backup.size)}</p>
                        <button className="text-blue-400 hover:text-blue-300 text-sm mt-1">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Nenhum arquivo de backup encontrado.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Secret Modal */}
      {showAddSecretModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Adicionar Secret PPP</h3>
            <form onSubmit={handleAddSecret}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={secretFormData.name}
                    onChange={handleSecretFormChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
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
                    value={secretFormData.password}
                    onChange={handleSecretFormChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Serviço
                  </label>
                  <select
                    name="service"
                    value={secretFormData.service}
                    onChange={handleSecretFormChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="pppoe">PPPoE</option>
                    <option value="pptp">PPTP</option>
                    <option value="l2tp">L2TP</option>
                    <option value="ovpn">OpenVPN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Perfil
                  </label>
                  <input
                    type="text"
                    name="profile"
                    value={secretFormData.profile}
                    onChange={handleSecretFormChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Caller ID
                  </label>
                  <input
                    type="text"
                    name="callerId"
                    value={secretFormData.callerId}
                    onChange={handleSecretFormChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rotas
                  </label>
                  <input
                    type="text"
                    name="routes"
                    value={secretFormData.routes}
                    onChange={handleSecretFormChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Comentário
                  </label>
                  <input
                    type="text"
                    name="comment"
                    value={secretFormData.comment}
                    onChange={handleSecretFormChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddSecretModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={addingSecret}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingSecret ? 'Adicionando...' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}