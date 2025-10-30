'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Vm = {
  id: string
  vmid: number
  name: string
  status: string
  node: string
  type: 'qemu' | 'lxc' | string
  maxmem?: number
  maxcpu?: number
  mem?: number
  cpu?: number
}

type Server = {
  id: string
  name: string
  baseUrl: string
  user: string
  insecure?: boolean
}

export default function VirtualizacaoPage() {
  const { data: session, status } = useSession()
  const [vms, setVms] = useState<Vm[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)
  const [servers, setServers] = useState<Server[]>([])
  const [serverId, setServerId] = useState<string>('')
  const [nodes, setNodes] = useState<{ node: string }[]>([])

  // Create VM modal state
  const [showCreate, setShowCreate] = useState(false)
  const [tmplVmid, setTmplVmid] = useState('')
  const [newName, setNewName] = useState('')
  const [newVmid, setNewVmid] = useState('')
  const [targetNode, setTargetNode] = useState('')
  const [fullClone, setFullClone] = useState(true)
  const [storage, setStorage] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    if (!session) { window.location.href = '/login'; return }
    if (session.user.role !== 'admin') { window.location.href = '/dashboard'; return }
    init()
  }, [session, status])

  async function init() {
    // Load servers and pick first by default
    try {
      const r = await fetch('/api/admin/proxmox/servers')
      const list = r.ok ? await r.json() : []
      setServers(list)
      if (list.length && !serverId) setServerId(list[0].id)
    } catch {}
    await load()
  }

  async function load() {
    setLoading(true)
    try {
      const url = serverId ? `/api/admin/proxmox/vms?serverId=${encodeURIComponent(serverId)}` : '/api/admin/proxmox/vms'
      const res = await fetch(url)
      const data = res.ok ? await res.json() : []
      // normalize
      const mapped: Vm[] = (data || []).map((d: any) => ({
        id: String(d.vmid),
        vmid: d.vmid,
        name: d.name || `vm-${d.vmid}`,
        status: d.status,
        node: d.node,
        type: d.type,
        maxmem: d.maxmem,
        maxcpu: d.maxcpu,
        mem: d.mem,
        cpu: d.cpu,
      }))
      setVms(mapped)
    } catch (e) {
      console.error('Failed to load VMs', e)
      setVms([])
    } finally { setLoading(false) }
  }

  async function loadNodes() {
    try {
      const url = serverId ? `/api/admin/proxmox/nodes?serverId=${encodeURIComponent(serverId)}` : '/api/admin/proxmox/nodes'
      const r = await fetch(url)
      const list = r.ok ? await r.json() : []
      setNodes(list)
      if (list?.length && !targetNode) setTargetNode(list[0].node)
    } catch (e) {
      setNodes([])
    }
  }

  useEffect(() => { if (serverId) { load(); loadNodes(); } }, [serverId])

  async function action(v: Vm, act: 'start'|'stop'|'reboot') {
    setBusy(`${v.node}-${v.vmid}-${act}`)
    try {
      const url = `/api/admin/proxmox/vms/${encodeURIComponent(String(v.vmid))}/status?action=${act}&node=${encodeURIComponent(v.node)}&type=${encodeURIComponent(v.type)}${serverId?`&serverId=${encodeURIComponent(serverId)}`:''}`
      const res = await fetch(url, { method: 'POST' })
      if (!res.ok) {
        const t = await res.text().catch(()=>'')
        alert(`Falha ao executar ${act}: ${t}`)
      } else {
        await load()
      }
    } finally {
      setBusy(null)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Carregando VMs...</p>
      </div>
    </div>
  )

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-4">
        <button onClick={()=>setShowCreate(true)} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Adicionar VM</button>
        <a href="#" onClick={(e)=>{e.preventDefault(); load()}} className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Atualizar</a>
      </div>
        <h1 className="text-3xl font-bold mb-6">Virtualização (Proxmox)</h1>
        <div className="flex items-center gap-3 mb-4">
          <label className="text-sm text-gray-400">Servidor:</label>
          <select value={serverId} onChange={e=>{ setServerId(e.target.value); setTimeout(load, 0) }} className="bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm">
            {servers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.baseUrl})</option>)}
          </select>
          <a href="#" onClick={(e)=>{e.preventDefault(); window.location.href = '/admin/virtualizacao/servers' }} className="text-blue-400 hover:text-blue-300 text-sm">Gerenciar servidores</a>
        </div>
  <p className="text-gray-400 mb-6">Liste e gerencie o estado das VMs. Agora é possível criar uma nova VM clonando um template (QEMU).</p>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">VMID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Node</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">CPU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Memória</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {vms.map(v => {
                const cpuPct = v.cpu ? Math.round(v.cpu*100) : 0
                const memPct = v.maxmem ? Math.round(((v.mem||0)/v.maxmem)*100) : 0
                const isRunning = v.status === 'running'
                return (
                  <tr key={`${v.node}-${v.vmid}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{v.vmid}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{v.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{v.node}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{v.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{cpuPct}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{memPct}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button disabled={busy!==null || isRunning} onClick={()=>action(v,'start')} className={`px-3 py-1 rounded ${isRunning?'opacity-40 bg-gray-700':'bg-green-600 hover:bg-green-700'}`}>Start</button>
                      <button disabled={busy!==null || !isRunning} onClick={()=>action(v,'stop')} className={`px-3 py-1 rounded ${!isRunning?'opacity-40 bg-gray-700':'bg-red-600 hover:bg-red-700'}`}>Stop</button>
                      <button disabled={busy!==null || !isRunning} onClick={()=>action(v,'reboot')} className={`px-3 py-1 rounded ${!isRunning?'opacity-40 bg-gray-700':'bg-yellow-600 hover:bg-yellow-700'}`}>Reboot</button>
                      {/* Ações limitadas às operações de energia */}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-xs text-gray-500">
          Observação: se o Proxmox usar certificado autoassinado, pode ser necessário aceitar o certificado acessando o URL do servidor antes de abrir o console.
        </div>

        {showCreate && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/70" onClick={()=>setShowCreate(false)} />
            <div className="absolute left-1/2 top-10 -translate-x-1/2 w-[95%] max-w-xl bg-gray-950 border border-gray-800 rounded p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Adicionar VM (Clone de Template)</h2>
                <button onClick={()=>setShowCreate(false)} className="px-3 py-1 bg-gray-800 rounded">Fechar</button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Servidor</label>
                  <select value={serverId} onChange={e=>setServerId(e.target.value)} className="w-full bg-black border border-gray-800 rounded px-2 py-1 text-sm">
                    {servers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.baseUrl})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Node</label>
                  <select value={targetNode} onChange={e=>setTargetNode(e.target.value)} className="w-full bg-black border border-gray-800 rounded px-2 py-1 text-sm">
                    {nodes.map(n => <option key={n.node} value={n.node}>{n.node}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Template VMID (QEMU)</label>
                  <input value={tmplVmid} onChange={e=>setTmplVmid(e.target.value)} className="w-full bg-black border border-gray-800 rounded px-2 py-1 text-sm" placeholder="Ex: 9000" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Novo VMID (opcional)</label>
                    <input value={newVmid} onChange={e=>setNewVmid(e.target.value)} className="w-full bg-black border border-gray-800 rounded px-2 py-1 text-sm" placeholder="auto" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Nome</label>
                    <input value={newName} onChange={e=>setNewName(e.target.value)} className="w-full bg-black border border-gray-800 rounded px-2 py-1 text-sm" placeholder="web01" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <input id="full" type="checkbox" checked={fullClone} onChange={e=>setFullClone(e.target.checked)} />
                    <label htmlFor="full" className="text-sm text-gray-300">Full clone</label>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Storage (opcional)</label>
                    <input value={storage} onChange={e=>setStorage(e.target.value)} className="w-full bg-black border border-gray-800 rounded px-2 py-1 text-sm" placeholder="Ex: local-lvm" />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button onClick={()=>setShowCreate(false)} className="px-4 py-2 bg-gray-800 rounded">Cancelar</button>
                  <button onClick={createVm} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">Criar</button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )

  async function createVm() {
    if (!serverId || !targetNode || !tmplVmid) {
      alert('Preencha Servidor, Node e Template VMID')
      return
    }
    try {
      const res = await fetch('/api/admin/proxmox/vms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serverId,
          mode: 'clone-qemu',
          node: targetNode,
          templateVmid: Number(tmplVmid),
          name: newName || undefined,
          newid: newVmid ? Number(newVmid) : undefined,
          full: fullClone,
          storage: storage || undefined,
        })
      })
      if (!res.ok) {
        const t = await res.text().catch(()=> '')
        alert('Falha ao criar VM: ' + t)
        return
      }
      setShowCreate(false)
      // Small delay before reload to allow task start
      setTimeout(load, 1500)
    } catch (e) {
      alert('Erro: ' + (e as any)?.message)
    }
  }
}
