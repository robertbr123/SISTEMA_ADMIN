'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

type Client = {
  id: string
  name: string
  document?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  status?: 'active' | 'inactive'
  notes?: string
  createdAt?: string
}

export default function ClientesAdmin() {
  const { data: session, status } = useSession()
  const [items, setItems] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Client | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) { window.location.href = '/login'; return }
    if ((session.user as any).role !== 'admin') { window.location.href = '/dashboard'; return }
    load()
  }, [session, status])

  async function load() {
    try {
      const res = await fetch('/api/admin/clientes')
      if (res.ok) setItems(await res.json())
    } finally { setLoading(false) }
  }

  const filtered = items.filter(c =>
    (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.document || '').toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p>Carregando clientes...</p>
      </div>
    </div>
  )

  if (editing) {
    const c = editing
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-2xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">{c.id ? 'Editar Cliente' : 'Novo Cliente'}</h1>
          <div className="bg-gray-800 rounded p-4 space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nome</label>
                <input value={c.name||''} onChange={e=>setEditing({ ...c, name: e.target.value })} className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Documento (CPF/CNPJ)</label>
                <input value={c.document||''} onChange={e=>setEditing({ ...c, document: e.target.value })} className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input value={c.email||''} onChange={e=>setEditing({ ...c, email: e.target.value })} className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Telefone</label>
                <input value={c.phone||''} onChange={e=>setEditing({ ...c, phone: e.target.value })} className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Endereço</label>
              <input value={c.address||''} onChange={e=>setEditing({ ...c, address: e.target.value })} className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2" />
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Cidade</label>
                <input value={c.city||''} onChange={e=>setEditing({ ...c, city: e.target.value })} className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Estado</label>
                <input value={c.state||''} onChange={e=>setEditing({ ...c, state: e.target.value })} className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">CEP</label>
                <input value={c.zipCode||''} onChange={e=>setEditing({ ...c, zipCode: e.target.value })} className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Status</label>
                <select value={c.status||'active'} onChange={e=>setEditing({ ...c, status: e.target.value as any })} className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2">
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Notas</label>
                <input value={c.notes||''} onChange={e=>setEditing({ ...c, notes: e.target.value })} className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={()=>setEditing(null)} className="px-4 py-2 bg-gray-700 rounded">Cancelar</button>
              <button disabled={saving} onClick={onSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50">{saving?'Salvando...':'Salvar'}</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Clientes</h1>
          <p className="text-xl text-gray-400">Cadastre e gerencie clientes (CRM)</p>
        </div>
        <button onClick={()=>setEditing({ id: '' as any, name: '', status: 'active' })} className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition-colors">Adicionar Cliente</button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nome, documento ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
        />
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Nome</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Documento</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Telefone</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Cadastro</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm text-white">{c.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{c.document || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{c.email || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{c.phone || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${c.status === 'inactive' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                      {c.status === 'inactive' ? 'Inativo' : 'Ativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={()=>setEditing(c)}
                        className="inline-flex items-center justify-center p-2 rounded hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        aria-label={`Editar ${c.name}`}
                        title="Editar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712z" />
                          <path d="M3 17.25V21h3.75l11.02-11.02-3.712-3.712L3 17.25z" />
                        </svg>
                      </button>
                      <button
                        onClick={()=>setDeleteTarget(c)}
                        className="inline-flex items-center justify-center p-2 rounded hover:bg-red-500/10 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                        aria-label={`Excluir ${c.name}`}
                        title="Excluir"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                          <path fillRule="evenodd" d="M9 3.75A1.75 1.75 0 0 1 10.75 2h2.5A1.75 1.75 0 0 1 15 3.75V5h3.25a.75.75 0 0 1 0 1.5H5.75a.75.75 0 0 1 0-1.5H9V3.75zM6.75 7.25h10.5l-.7 11.036A2.75 2.75 0 0 1 13.812 21H10.19a2.75 2.75 0 0 1-2.738-2.714L6.75 7.25z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">{search ? 'Nenhum cliente encontrado para a busca' : 'Nenhum cliente cadastrado'}</p>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={()=>!deleting && setDeleteTarget(null)} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-md text-white">
            <h2 className="text-xl font-semibold mb-2">Excluir cliente</h2>
            <p className="text-gray-300">Tem certeza que deseja excluir <span className="font-semibold">{deleteTarget.name}</span>? Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3 justify-end mt-6">
              <button disabled={deleting} onClick={()=>setDeleteTarget(null)} className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50">Cancelar</button>
              <button disabled={deleting} onClick={onConfirmDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded disabled:opacity-50">{deleting? 'Excluindo...' : 'Excluir'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  async function onConfirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/clientes/${encodeURIComponent(deleteTarget.id)}`, { method: 'DELETE' })
      if (!res.ok) { alert('Falha ao excluir'); return }
      setItems(prev => prev.filter(x => x.id !== deleteTarget.id))
      setDeleteTarget(null)
    } finally { setDeleting(false) }
  }

  async function onSave() {
    if (!editing) return
    setSaving(true)
    try {
      const payload = {
        name: editing.name,
        document: editing.document,
        email: editing.email,
        phone: editing.phone,
        address: editing.address,
        city: editing.city,
        state: editing.state,
        zipCode: editing.zipCode,
        status: editing.status,
        notes: editing.notes,
      }
      let res: Response
      if (editing.id) {
        res = await fetch(`/api/admin/clientes/${encodeURIComponent(editing.id)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      } else {
        res = await fetch(`/api/admin/clientes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      }
      if (!res.ok) {
        const t = await res.text().catch(()=> '')
        alert('Falha ao salvar: ' + t)
        return
      }
      const row = await res.json()
      setItems(prev => {
        const exists = prev.some(x => x.id === row.id)
        return exists ? prev.map(x => x.id === row.id ? row : x) : [row, ...prev]
      })
      setEditing(null)
    } finally { setSaving(false) }
  }
}