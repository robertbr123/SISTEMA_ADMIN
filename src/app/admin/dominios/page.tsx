'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Domain {
  id: string
  name: string
  status: 'active' | 'pending' | 'error'
  nameservers: string[]
  created: string
  expires: string
  sslStatus: 'active' | 'pending' | 'error'
  dnsRecords: number
}

export default function CloudflareDomains() {
  const { data: session, status } = useSession()
  const [domains, setDomains] = useState<Domain[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [provider, setProvider] = useState<'cloudflare' | 'cpanel'>('cloudflare')
  const [showDnsModal, setShowDnsModal] = useState(false)
  const [dnsRecords, setDnsRecords] = useState<any[]>([])
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null)
  const [dnsLoading, setDnsLoading] = useState(false)

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

    fetchDomains()
  }, [session, status])
  const fetchDomains = async (refresh: boolean = false) => {
    try {
      const base = provider === 'cloudflare' ? '/api/admin/cloudflare/domains' : '/api/admin/cpanel/domains'
      const url = base + (refresh ? '?refresh=true' : '')
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setDomains(data)
        return
      }

      console.error('Failed to fetch domains from API, falling back to mock')
      setDomains([])
    } catch (error) {
      console.error('Error fetching domains:', error)
      setDomains([])
    } finally {
      setLoading(false)
    }
  }

  const handleSync = async () => {
    setSyncing(true)
    try {
      await fetchDomains(true)
    } finally {
      setSyncing(false)
    }
  }

  const handleAddDomain = async () => {
    const name = window.prompt('Informe o domínio (ex: exemplo.com)')
    if (!name) return

    try {
      if (provider === 'cloudflare') {
        const res = await fetch('/api/admin/cloudflare/domains', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name })
        })

        if (res.ok) {
          await fetchDomains(true)
          alert('Domínio criado e sincronizado (Cloudflare)')
        } else {
          const err = await res.json().catch(() => null)
          console.error('Failed creating domain (Cloudflare)', err)
          alert('Falha ao criar domínio no Cloudflare. Veja console para detalhes.')
        }
      } else {
        const dir = window.prompt('Diretório (opcional, ex: public_html/exemplo.com)') || undefined
        const res = await fetch('/api/admin/cpanel/domains', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, dir })
        })

        if (res.ok) {
          await fetchDomains(true)
          alert('Domínio criado no cPanel e sincronizado')
        } else {
          const err = await res.json().catch(() => null)
          console.error('Failed creating domain (cPanel)', err)
          alert('Falha ao criar domínio no cPanel. Veja console para detalhes.')
        }
      }
    } catch (error) {
      console.error('Error creating domain:', error)
      alert('Erro ao criar domínio')
    }
  }

  const handleOpenDNS = async (domain: Domain) => {
    setSelectedDomain(domain)
    setShowDnsModal(true)
    setDnsLoading(true)
    try {
      const base = provider === 'cloudflare' ? `/api/admin/cloudflare/domains/${domain.id}/dns` : `/api/admin/cpanel/domains/${encodeURIComponent(domain.name)}/dns`
      const res = await fetch(base)
      if (res.ok) {
        const data = await res.json()
        setDnsRecords(data)
      } else {
        console.error('Failed to fetch DNS records for domain', domain.name)
        setDnsRecords([])
      }
    } catch (error) {
      console.error('Error fetching DNS records:', error)
      setDnsRecords([])
    } finally {
      setDnsLoading(false)
    }
  }

  const handleCloseDNS = () => {
    setShowDnsModal(false)
    setSelectedDomain(null)
    setDnsRecords([])
  }

  const handleAddDnsRecord = async (record: any) => {
    if (!selectedDomain) return
    const base = provider === 'cloudflare' ? `/api/admin/cloudflare/domains/${selectedDomain.id}/dns` : `/api/admin/cpanel/domains/${encodeURIComponent(selectedDomain.name)}/dns`
    const res = await fetch(base, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) })
    if (res.ok) {
      const data = await res.json()
      // refresh list
      await handleOpenDNS(selectedDomain)
      return data
    } else {
      const txt = await res.text().catch(() => '')
      throw new Error(txt || 'Failed to add record')
    }
  }

  const handleDeleteDnsRecord = async (record: any) => {
    if (!selectedDomain) return
    try {
      if (provider === 'cloudflare') {
        const res = await fetch(`/api/admin/cloudflare/domains/${selectedDomain.id}/dns?recordId=${encodeURIComponent(record.id)}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('Failed to delete')
      } else {
        const res = await fetch(`/api/admin/cpanel/domains/${encodeURIComponent(selectedDomain.name)}/dns?line=${encodeURIComponent(String(record.line || record.id || ''))}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('Failed to delete')
      }
      await handleOpenDNS(selectedDomain)
    } catch (error) {
      console.error('Failed to delete DNS record:', error)
      throw error
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Carregando domínios...</p>
      </div>
    </div>
  )

  return (
    <div className="text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gerenciar Domínios</h1>
            <p className="text-xl text-gray-400">Controle seus domínios e registros DNS via Cloudflare</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              Fonte:
            </div>
            <select className="bg-gray-700 text-white rounded px-2 py-1" value={provider} onChange={e => setProvider(e.target.value as any)}>
              <option value="cloudflare">Cloudflare</option>
              <option value="cpanel">cPanel (account)</option>
            </select>

            <button
              onClick={handleAddDomain}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
            >
              Adicionar Domínio
            </button>
            <button
              onClick={handleSync}
              disabled={syncing}
              className={`bg-green-600 text-white px-6 py-3 rounded transition-colors ${syncing ? 'opacity-60 cursor-wait' : 'hover:bg-green-700'}`}
            >
              {syncing ? 'Sincronizando...' : 'Sincronizar'}
            </button>
          </div>
        </div>

        {/* Domain Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Domínios Ativos</h3>
            <p className="text-3xl font-bold text-green-600">
              {domains.filter(d => d.status === 'active').length}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Domínios Pendentes</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {domains.filter(d => d.status === 'pending').length}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">SSL Ativo</h3>
            <p className="text-3xl font-bold text-blue-600">
              {domains.filter(d => d.sslStatus === 'active').length}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Registros DNS</h3>
            <p className="text-3xl font-bold text-purple-600">
              {domains.reduce((acc, d) => acc + d.dnsRecords, 0)}
            </p>
          </div>
        </div>

        {/* Domains Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold">Domínios Gerenciados</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Domínio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    SSL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Registros DNS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Expira em
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {domains.map((domain) => (
                  <tr key={domain.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{domain.name}</div>
                      <div className="text-xs text-gray-400">
                        Criado: {new Date(domain.created).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        domain.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : domain.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {domain.status === 'active' ? 'Ativo' : domain.status === 'pending' ? 'Pendente' : 'Erro'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        domain.sslStatus === 'active'
                          ? 'bg-green-100 text-green-800'
                          : domain.sslStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {domain.sslStatus === 'active' ? 'Ativo' : domain.sslStatus === 'pending' ? 'Pendente' : 'Erro'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {domain.dnsRecords}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(domain.expires).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleOpenDNS(domain)} className="text-blue-600 hover:text-blue-500 mr-4">
                        DNS
                      </button>
                      <button className="text-green-600 hover:text-green-500 mr-4">
                        SSL
                      </button>
                      <button className="text-red-600 hover:text-red-500">
                        Remover
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
          <h2 className="text-2xl font-bold mb-6">Configurações Cloudflare</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                API Token
              </label>
              <input
                type="password"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                placeholder="Token de API do Cloudflare"
                defaultValue=""
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Account ID
              </label>
              <input
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                placeholder="ID da conta Cloudflare"
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