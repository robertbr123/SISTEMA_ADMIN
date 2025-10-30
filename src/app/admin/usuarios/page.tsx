'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role?: 'admin' | 'user'
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  subscriptions: {
    id: string
    planName: string
    price: number
    status: string
  }[]
  createdAt: string
}

export default function UsuariosAdmin() {
  const { data: session, status } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [openCreate, setOpenCreate] = useState(false)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user',
    phone: '', address: '', city: '', state: '', zipCode: ''
  })
  const [editUser, setEditUser] = useState<User | null>(null)
  const [editPassword, setEditPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) { window.location.href = '/login'; return }
    if ((session.user as any).role !== 'admin') { window.location.href = '/dashboard'; return }
    fetchUsers()
  }, [session, status])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      if (res.ok) setUsers(await res.json())
    } finally { setLoading(false) }
  }

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p>Carregando usuários...</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Gerenciar Usuários</h1>
          <p className="text-xl text-gray-400">Contas com acesso ao sistema</p>
        </div>
        <button onClick={()=>setOpenCreate(true)} className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition-colors">Adicionar Usuário</button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
        />
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Nome</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Telefone</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Plano</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Cadastro</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm text-white">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{user.phone || 'Não informado'}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{user.subscriptions[0]?.planName || 'Nenhum'}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.subscriptions[0]?.status === 'active' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {user.subscriptions[0]?.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={()=>setEditUser(user)}
                        className="inline-flex items-center justify-center p-2 rounded hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        aria-label={`Editar ${user.name}`}
                        title="Editar"
                      >
                        {/* Pencil Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712z" />
                          <path d="M3 17.25V21h3.75l11.02-11.02-3.712-3.712L3 17.25z" />
                        </svg>
                      </button>
                      <button
                        onClick={()=>setDeleteTarget(user)}
                        className="inline-flex items-center justify-center p-2 rounded hover:bg-red-500/10 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                        aria-label={`Excluir ${user.name}`}
                        title="Excluir"
                      >
                        {/* Trash Icon */}
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

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">
            {searchTerm ? 'Nenhum usuário encontrado para a busca' : 'Nenhum usuário encontrado'}
          </p>
        </div>
      )}

      {openCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={()=>!creating && setOpenCreate(false)} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-2xl text-white">
            <h2 className="text-2xl font-semibold mb-4">Novo Usuário</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nome</label>
                <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Senha</label>
                <input type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Papel</label>
                <select value={form.role} onChange={e=>setForm({...form, role: e.target.value as 'admin'|'user'})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2">
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Telefone</label>
                <input value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Endereço</label>
                <input value={form.address} onChange={e=>setForm({...form, address: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Cidade</label>
                <input value={form.city} onChange={e=>setForm({...form, city: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Estado</label>
                <input value={form.state} onChange={e=>setForm({...form, state: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">CEP</label>
                <input value={form.zipCode} onChange={e=>setForm({...form, zipCode: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-5">
              <button disabled={creating} onClick={()=>setOpenCreate(false)} className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50">Cancelar</button>
              <button disabled={creating} onClick={onCreate} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50">{creating? 'Criando...' : 'Criar Usuário'}</button>
            </div>
          </div>
        </div>
      )}

      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={()=>!saving && (setEditUser(null), setEditPassword(''))} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-2xl text-white">
            <h2 className="text-2xl font-semibold mb-4">Editar Usuário</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nome</label>
                <input value={editUser.name} onChange={e=>setEditUser({ ...editUser, name: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input type="email" value={editUser.email} onChange={e=>setEditUser({ ...editUser, email: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Senha (opcional)</label>
                <input type="password" value={editPassword} placeholder="Deixe em branco para não alterar" onChange={e=>setEditPassword(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Papel</label>
                <select value={editUser.role||'user'} onChange={e=>setEditUser({ ...editUser, role: e.target.value as 'admin'|'user' })} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2">
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Telefone</label>
                <input value={editUser.phone || ''} onChange={e=>setEditUser({ ...editUser, phone: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Endereço</label>
                <input value={editUser.address || ''} onChange={e=>setEditUser({ ...editUser, address: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Cidade</label>
                <input value={editUser.city || ''} onChange={e=>setEditUser({ ...editUser, city: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Estado</label>
                <input value={editUser.state || ''} onChange={e=>setEditUser({ ...editUser, state: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">CEP</label>
                <input value={editUser.zipCode || ''} onChange={e=>setEditUser({ ...editUser, zipCode: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2" />
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-5">
              <button disabled={saving} onClick={()=>{ setEditUser(null); setEditPassword('') }} className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50">Cancelar</button>
              <button disabled={saving} onClick={onSaveEdit} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50">{saving? 'Salvando...' : 'Salvar Alterações'}</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={()=>!deleting && setDeleteTarget(null)} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-md text-white">
            <h2 className="text-xl font-semibold mb-2">Excluir usuário</h2>
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

  async function onCreate() {
    if (!form.name || !form.email || !form.password) { alert('Preencha nome, email e senha'); return }
    setCreating(true)
    try {
      const res = await fetch('/api/admin/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) {
        const t = await res.text().catch(()=> '')
        alert('Falha ao criar: ' + t)
        return
      }
      setOpenCreate(false)
      setForm({ name:'', email:'', password:'', role:'user', phone:'', address:'', city:'', state:'', zipCode:'' })
      await fetchUsers()
    } finally { setCreating(false) }
  }

  async function onConfirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/users/${encodeURIComponent(deleteTarget.id)}`, { method: 'DELETE' })
      if (!res.ok) { alert('Falha ao excluir'); return }
      setUsers(prev => prev.filter(u => u.id !== deleteTarget.id))
      setDeleteTarget(null)
    } finally { setDeleting(false) }
  }

  async function onSaveEdit() {
    if (!editUser) return
    setSaving(true)
    try {
      const payload: any = {
        name: editUser.name,
        email: editUser.email,
        role: editUser.role,
        phone: editUser.phone,
        address: editUser.address,
        city: editUser.city,
        state: editUser.state,
        zipCode: editUser.zipCode,
      }
      // optionally include password if present and >= 6
      if (editPassword && editPassword.length >= 6) {
        payload.password = editPassword
      }
      const res = await fetch(`/api/admin/users/${encodeURIComponent(editUser.id)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) {
        const t = await res.text().catch(()=> '')
        alert('Falha ao salvar: ' + t)
        return
      }
      const updated = await res.json()
      setUsers(prev => prev.map(u => u.id === updated.id ? { ...u, ...updated } : u))
      setEditUser(null)
      setEditPassword('')
    } finally { setSaving(false) }
  }
}
