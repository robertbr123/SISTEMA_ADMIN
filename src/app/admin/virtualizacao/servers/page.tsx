'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ProxmoxServersPage() {
  const [servers, setServers] = useState<any[]>([])
  const [form, setForm] = useState<any>({ name: '', baseUrl: '', user: '', tokenId: '', tokenSecret: '', insecure: false })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/proxmox/servers')
      const data = res.ok ? await res.json() : []
      setServers(data)
    } finally { setLoading(false) }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/proxmox/servers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) {
        const t = await res.text().catch(()=>'' )
        alert('Erro ao salvar: ' + t)
        return
      }
      setForm({ name: '', baseUrl: '', user: '', tokenId: '', tokenSecret: '', insecure: false })
      await load()
    } finally { setSaving(false) }
  }

  return (
    <div className="text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Servidores Proxmox</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Cadastrados</h2>
            {loading ? (
              <div className="text-gray-400">Carregando...</div>
            ) : (
              <ul className="space-y-2">
                {servers.map((s: any) => (
                  <li key={s.id} className="p-3 bg-gray-900 border border-gray-800 rounded flex items-center justify-between">
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-sm text-gray-400">{s.baseUrl} • {s.user} • inseguro: {s.insecure ? 'sim' : 'não'}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-3 py-1 rounded bg-red-700 hover:bg-red-800 text-sm"
                        onClick={async ()=>{
                          if (!confirm(`Apagar servidor ${s.name}?`)) return
                          try {
                            const res = await fetch(`/api/admin/proxmox/servers/${encodeURIComponent(s.id)}`, { method: 'DELETE' })
                            if (!res.ok) {
                              const t = await res.text().catch(()=>'' )
                              alert('Falha ao apagar: ' + t)
                              return
                            }
                            await load()
                          } catch (e) {
                            alert('Erro ao apagar: '+ (e as any)?.message || e)
                          }
                        }}
                      >Apagar</button>
                    </div>
                  </li>
                ))}
                {servers.length === 0 && <li className="text-gray-500 text-sm">Nenhum servidor cadastrado.</li>}
              </ul>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Adicionar servidor</h2>
            <form onSubmit={save} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400">Nome</label>
                <input className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm text-gray-400">Base URL (ex: https://pve.local:8006/api2/json)</label>
                <input className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2" value={form.baseUrl} onChange={e=>setForm({...form, baseUrl: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm text-gray-400">Usuário (ex: root@pam)</label>
                <input className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2" value={form.user} onChange={e=>setForm({...form, user: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm text-gray-400">Token ID (apenas o token, sem user@realm!)</label>
                <input className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2" value={form.tokenId} onChange={e=>setForm({...form, tokenId: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm text-gray-400">Token Secret</label>
                <input className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2" value={form.tokenSecret} onChange={e=>setForm({...form, tokenSecret: e.target.value})} required />
              </div>
              <div className="flex items-center gap-2">
                <input id="insecure" type="checkbox" checked={!!form.insecure} onChange={e=>setForm({...form, insecure: e.target.checked})} />
                <label htmlFor="insecure" className="text-sm text-gray-400">Permitir certificado autoassinado (dev)</label>
              </div>
              <div>
                <button disabled={saving} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">{saving? 'Salvando...' : 'Salvar'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
