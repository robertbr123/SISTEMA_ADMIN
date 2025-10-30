"use client"

import { useEffect, useState } from 'react'

type Site = { id: string, name: string, address?: string|null }
type Vlan = { id: string, name: string, vid: number, siteId?: string|null }
type Subnet = { id: string, cidr: string, name?: string|null, siteId?: string|null, vlanId?: string|null }
type Device = { id: string, name: string, type: string, siteId?: string|null, mgmtIp?: string|null }
type IP = { id: string, address: string, subnetId: string, status: string, deviceId?: string|null, fqdn?: string|null, purpose?: string|null, interface?: string|null }
type Service = { id: string, deviceId: string, name: string, protocol: string, port: number, externalPort?: number|null }

export default function RedePage() {
  const [tab, setTab] = useState<'subnets'|'ips'|'devices'|'services'|'vlans'|'sites'>('subnets')
  const [sites, setSites] = useState<Site[]>([])
  const [vlans, setVlans] = useState<Vlan[]>([])
  const [subnets, setSubnets] = useState<Subnet[]>([])
  const [devices, setDevices] = useState<Device[]>([])
  const [ips, setIps] = useState<IP[]>([])
  const [services, setServices] = useState<Service[]>([])

  const [loading, setLoading] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ resource: string, id: string, label?: string } | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    setLoading(true)
    try {
      const [s, v, n, d, i, sv] = await Promise.all([
        fetch('/api/admin/rede/sites').then(r=>r.json()).catch(()=>[]),
        fetch('/api/admin/rede/vlans').then(r=>r.json()).catch(()=>[]),
        fetch('/api/admin/rede/subnets').then(r=>r.json()).catch(()=>[]),
        fetch('/api/admin/rede/devices').then(r=>r.json()).catch(()=>[]),
        fetch('/api/admin/rede/ips').then(r=>r.json()).catch(()=>[]),
        fetch('/api/admin/rede/services').then(r=>r.json()).catch(()=>[]),
      ])
      setSites(s); setVlans(v); setSubnets(n); setDevices(d); setIps(i); setServices(sv)
    } finally { setLoading(false) }
  }

  // Simple form states (per tab)
  // Sites
  const [siteName, setSiteName] = useState('')
  const [siteAddress, setSiteAddress] = useState('')

  // VLANs
  const [vlanName, setVlanName] = useState('')
  const [vlanVid, setVlanVid] = useState('')
  const [vlanSiteId, setVlanSiteId] = useState('')

  // Subnets
  const [subCidr, setSubCidr] = useState('')
  const [subName, setSubName] = useState('')
  const [subSiteId, setSubSiteId] = useState('')
  const [subVlanId, setSubVlanId] = useState('')

  // Devices
  const [devName, setDevName] = useState('')
  const [devType, setDevType] = useState('OTHER')
  const [devSiteId, setDevSiteId] = useState('')
  const [devMgmtIp, setDevMgmtIp] = useState('')

  // IPs
  const [ipAddress, setIpAddress] = useState('')
  const [ipSubnetId, setIpSubnetId] = useState('')
  const [ipDeviceId, setIpDeviceId] = useState('')
  const [ipFqdn, setIpFqdn] = useState('')
  const [ipStatus, setIpStatus] = useState('ASSIGNED')
  const [ipSearchTerm, setIpSearchTerm] = useState('')

  // Services
  const [svcDeviceId, setSvcDeviceId] = useState('')
  const [svcName, setSvcName] = useState('')
  const [svcProto, setSvcProto] = useState('TCP')
  const [svcPort, setSvcPort] = useState('')
  const [svcExtPort, setSvcExtPort] = useState('')

  async function addSite() {
    if (!siteName) return alert('Nome obrigatório')
    const res = await fetch('/api/admin/rede/sites', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name: siteName, address: siteAddress }) })
    if (!res.ok) return alert('Erro ao criar site')
    setSiteName(''); setSiteAddress(''); loadAll()
  }

  async function addVlan() {
    if (!vlanName || !vlanVid) return alert('Nome e VID obrigatórios')
    const res = await fetch('/api/admin/rede/vlans', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name: vlanName, vid: Number(vlanVid), siteId: vlanSiteId || undefined }) })
    if (!res.ok) return alert('Erro ao criar VLAN')
    setVlanName(''); setVlanVid(''); setVlanSiteId(''); loadAll()
  }

  async function addSubnet() {
    if (!subCidr) return alert('CIDR obrigatório')
    const res = await fetch('/api/admin/rede/subnets', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ cidr: subCidr, name: subName || undefined, siteId: subSiteId || undefined, vlanId: subVlanId || undefined }) })
    if (!res.ok) return alert('Erro ao criar Sub-rede')
    setSubCidr(''); setSubName(''); setSubSiteId(''); setSubVlanId(''); loadAll()
  }

  async function addDevice() {
    if (!devName) return alert('Nome obrigatório')
    const res = await fetch('/api/admin/rede/devices', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name: devName, type: devType, siteId: devSiteId || undefined, mgmtIp: devMgmtIp || undefined }) })
    if (!res.ok) return alert('Erro ao criar Dispositivo')
    setDevName(''); setDevType('OTHER'); setDevSiteId(''); setDevMgmtIp(''); loadAll()
  }

  async function addIP() {
    if (!ipAddress || !ipSubnetId) return alert('IP e Sub-rede são obrigatórios')
    const res = await fetch('/api/admin/rede/ips', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ address: ipAddress, subnetId: ipSubnetId, deviceId: ipDeviceId || undefined, fqdn: ipFqdn || undefined, status: ipStatus }) })
    if (!res.ok) return alert('Erro ao criar IP')
    setIpAddress(''); setIpSubnetId(''); setIpDeviceId(''); setIpFqdn(''); setIpStatus('ASSIGNED'); loadAll()
  }

  // Search IPs on demand (debounced)
  useEffect(() => {
    const h = setTimeout(async () => {
      const url = ipSearchTerm ? `/api/admin/rede/ips?q=${encodeURIComponent(ipSearchTerm)}` : '/api/admin/rede/ips'
      const data = await fetch(url).then(r=>r.json()).catch(()=>[])
      setIps(data)
    }, 300)
    return () => clearTimeout(h)
  }, [ipSearchTerm])

  async function addService() {
    if (!svcDeviceId || !svcName || !svcPort) return alert('Dispositivo, Nome e Porta são obrigatórios')
    const res = await fetch('/api/admin/rede/services', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ deviceId: svcDeviceId, name: svcName, protocol: svcProto, port: Number(svcPort), externalPort: svcExtPort? Number(svcExtPort): undefined }) })
    if (!res.ok) return alert('Erro ao criar Serviço')
    setSvcDeviceId(''); setSvcName(''); setSvcProto('TCP'); setSvcPort(''); setSvcExtPort(''); loadAll()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/rede/${deleteTarget.resource}/${deleteTarget.id}`, { method: 'DELETE' })
      if (!res.ok) return alert('Falha ao excluir')
      await loadAll()
      setDeleteTarget(null)
    } finally { setDeleting(false) }
  }

  return (
    <div className="text-white">
      <div className="mb-4 flex items-center gap-2 overflow-x-auto">
        {['subnets','ips','devices','services','vlans','sites'].map(t => (
          <button key={t} onClick={()=>setTab(t as any)} className={`px-3 py-1 rounded ${tab===t?'bg-gray-800':'bg-gray-900 hover:bg-gray-800'} text-sm capitalize`}>{t}</button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button onClick={()=>window.print()} className="bg-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-600">Imprimir</button>
          <button
            onClick={async()=>{
              const createSubnets = window.confirm('Criar sub-redes automaticamente para IPs não mapeados?')
              await fetch('/api/admin/rede/sync/mikrotik', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ createSubnets }) })
              await loadAll()
            }}
            className="bg-purple-700 px-3 py-1 rounded text-sm hover:bg-purple-600"
          >Sincronizar Mikrotik</button>
          <button onClick={async()=>{ await fetch('/api/admin/rede/sync/proxmox', { method:'POST' }); await loadAll() }} className="bg-indigo-700 px-3 py-1 rounded text-sm hover:bg-indigo-600">Sincronizar Proxmox</button>
          <button onClick={loadAll} className="bg-green-600 px-3 py-1 rounded text-sm hover:bg-green-700">Atualizar</button>
        </div>
      </div>

      {loading && <div className="text-gray-400">Carregando…</div>}

      {!loading && tab==='sites' && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Locais (Sites)</h2>
          <div className="grid md:grid-cols-3 gap-3 mb-3">
            <input value={siteName} onChange={e=>setSiteName(e.target.value)} placeholder="Nome" className="bg-black border border-gray-800 rounded px-2 py-1 text-sm" />
            <input value={siteAddress} onChange={e=>setSiteAddress(e.target.value)} placeholder="Endereço" className="bg-black border border-gray-800 rounded px-2 py-1 text-sm" />
            <button onClick={addSite} className="bg-blue-600 rounded text-sm px-3 py-1">Adicionar</button>
          </div>
          <table className="min-w-full divide-y divide-gray-800 text-sm">
            <thead><tr><th className="px-2 py-2 text-left">Nome</th><th className="px-2 py-2 text-left">Endereço</th><th></th></tr></thead>
            <tbody className="divide-y divide-gray-800">
              {sites.map(s => (
                <tr key={s.id}><td className="px-2 py-2">{s.name}</td><td className="px-2 py-2">{s.address || ''}</td><td className="px-2 py-2 text-right">
                  <button
                    onClick={()=>setDeleteTarget({ resource:'sites', id:s.id, label:s.name })}
                    className="inline-flex items-center justify-center p-2 rounded hover:bg-red-500/10 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                    aria-label={`Excluir ${s.name}`}
                    title="Excluir"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M9 3.75A1.75 1.75 0 0 1 10.75 2h2.5A1.75 1.75 0 0 1 15 3.75V5h3.25a.75.75 0 0 1 0 1.5H5.75a.75.75 0 0 1 0-1.5H9V3.75zM6.75 7.25h10.5l-.7 11.036A2.75 2.75 0 0 1 13.812 21H10.19a2.75 2.75 0 0 1-2.738-2.714L6.75 7.25z" clipRule="evenodd" /></svg>
                  </button>
                </td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && tab==='vlans' && (
        <div>
          <h2 className="text-lg font-semibold mb-2">VLANs</h2>
          <div className="grid md:grid-cols-4 gap-3 mb-3">
            <input value={vlanName} onChange={e=>setVlanName(e.target.value)} placeholder="Nome" className="bg-black border border-gray-800 rounded px-2 py-1 text-sm" />
            <input value={vlanVid} onChange={e=>setVlanVid(e.target.value)} placeholder="VID" className="bg-black border border-gray-800 rounded px-2 py-1 text-sm" />
            <select value={vlanSiteId} onChange={e=>setVlanSiteId(e.target.value)} className="bg-black border border-gray-800 rounded px-2 py-1 text-sm">
              <option value="">Sem site</option>
              {sites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <button onClick={addVlan} className="bg-blue-600 rounded text-sm px-3 py-1">Adicionar</button>
          </div>
          <table className="min-w-full divide-y divide-gray-800 text-sm">
            <thead><tr><th className="px-2 py-2 text-left">Nome</th><th className="px-2 py-2 text-left">VID</th><th className="px-2 py-2 text-left">Site</th><th></th></tr></thead>
            <tbody className="divide-y divide-gray-800">
              {vlans.map(v => (
                <tr key={v.id}><td className="px-2 py-2">{v.name}</td><td className="px-2 py-2">{v.vid}</td><td className="px-2 py-2">{sites.find(s=>s.id===v.siteId)?.name||''}</td><td className="px-2 py-2 text-right">
                  <button
                    onClick={()=>setDeleteTarget({ resource:'vlans', id:v.id, label:v.name })}
                    className="inline-flex items-center justify-center p-2 rounded hover:bg-red-500/10 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                    aria-label={`Excluir ${v.name}`}
                    title="Excluir"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M9 3.75A1.75 1.75 0 0 1 10.75 2h2.5A1.75 1.75 0 0 1 15 3.75V5h3.25a.75.75 0 0 1 0 1.5H5.75a.75.75 0 0 1 0-1.5H9V3.75zM6.75 7.25h10.5l-.7 11.036A2.75 2.75 0 0 1 13.812 21H10.19a2.75 2.75 0 0 1-2.738-2.714L6.75 7.25z" clipRule="evenodd" /></svg>
                  </button>
                </td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && tab==='subnets' && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Sub-redes</h2>
          <div className="grid md:grid-cols-5 gap-3 mb-3">
            <input value={subCidr} onChange={e=>setSubCidr(e.target.value)} placeholder="CIDR (ex: 192.168.1.0/24)" className="bg-black border border-gray-800 rounded px-2 py-1 text-sm" />
            <input value={subName} onChange={e=>setSubName(e.target.value)} placeholder="Nome" className="bg-black border border-gray-800 rounded px-2 py-1 text-sm" />
            <select value={subSiteId} onChange={e=>setSubSiteId(e.target.value)} className="bg-black border border-gray-800 rounded px-2 py-1 text-sm">
              <option value="">Sem site</option>
              {sites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <select value={subVlanId} onChange={e=>setSubVlanId(e.target.value)} className="bg-black border border-gray-800 rounded px-2 py-1 text-sm">
              <option value="">Sem VLAN</option>
              {vlans.map(v => <option key={v.id} value={v.id}>{v.name} ({v.vid})</option>)}
            </select>
            <button onClick={addSubnet} className="bg-blue-600 rounded text-sm px-3 py-1">Adicionar</button>
          </div>
          <table className="min-w-full divide-y divide-gray-800 text-sm">
            <thead><tr><th className="px-2 py-2 text-left">CIDR</th><th className="px-2 py-2 text-left">Nome</th><th className="px-2 py-2 text-left">Site</th><th className="px-2 py-2 text-left">VLAN</th><th></th></tr></thead>
            <tbody className="divide-y divide-gray-800">
              {subnets.map(n => (
                <tr key={n.id}><td className="px-2 py-2">{n.cidr}</td><td className="px-2 py-2">{n.name||''}</td><td className="px-2 py-2">{sites.find(s=>s.id===n.siteId)?.name||''}</td><td className="px-2 py-2">{vlans.find(v=>v.id===n.vlanId)?.name||''}</td><td className="px-2 py-2 text-right">
                  <button
                    onClick={()=>setDeleteTarget({ resource:'subnets', id:n.id, label:n.cidr })}
                    className="inline-flex items-center justify-center p-2 rounded hover:bg-red-500/10 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                    aria-label={`Excluir ${n.cidr}`}
                    title="Excluir"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M9 3.75A1.75 1.75 0 0 1 10.75 2h2.5A1.75 1.75 0 0 1 15 3.75V5h3.25a.75.75 0 0 1 0 1.5H5.75a.75.75 0 0 1 0-1.5H9V3.75zM6.75 7.25h10.5l-.7 11.036A2.75 2.75 0 0 1 13.812 21H10.19a2.75 2.75 0 0 1-2.738-2.714L6.75 7.25z" clipRule="evenodd" /></svg>
                  </button>
                </td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && tab==='devices' && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Dispositivos</h2>
          <div className="grid md:grid-cols-5 gap-3 mb-3">
            <input value={devName} onChange={e=>setDevName(e.target.value)} placeholder="Nome" className="bg-black border border-gray-800 rounded px-2 py-1 text-sm" />
            <select value={devType} onChange={e=>setDevType(e.target.value)} className="bg-black border border-gray-800 rounded px-2 py-1 text-sm">
              {['ROUTER','SWITCH','FIREWALL','SERVER','VM','AP','NAS','OTHER'].map(t=> <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={devSiteId} onChange={e=>setDevSiteId(e.target.value)} className="bg-black border border-gray-800 rounded px-2 py-1 text-sm">
              <option value="">Sem site</option>
              {sites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <input value={devMgmtIp} onChange={e=>setDevMgmtIp(e.target.value)} placeholder="IP de gestão (opcional)" className="bg-black border border-gray-800 rounded px-2 py-1 text-sm" />
            <button onClick={addDevice} className="bg-blue-600 rounded text-sm px-3 py-1">Adicionar</button>
          </div>
          <table className="min-w-full divide-y divide-gray-800 text-sm">
            <thead><tr><th className="px-2 py-2 text-left">Nome</th><th className="px-2 py-2 text-left">Tipo</th><th className="px-2 py-2 text-left">Site</th><th className="px-2 py-2 text-left">IP Gestão</th><th></th></tr></thead>
            <tbody className="divide-y divide-gray-800">
              {devices.map(d => (
                <tr key={d.id}><td className="px-2 py-2">{d.name}</td><td className="px-2 py-2">{d.type}</td><td className="px-2 py-2">{sites.find(s=>s.id===d.siteId)?.name||''}</td><td className="px-2 py-2">{d.mgmtIp||''}</td><td className="px-2 py-2 text-right">
                  <button
                    onClick={()=>setDeleteTarget({ resource:'devices', id:d.id, label:d.name })}
                    className="inline-flex items-center justify-center p-2 rounded hover:bg-red-500/10 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                    aria-label={`Excluir ${d.name}`}
                    title="Excluir"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M9 3.75A1.75 1.75 0 0 1 10.75 2h2.5A1.75 1.75 0 0 1 15 3.75V5h3.25a.75.75 0 0 1 0 1.5H5.75a.75.75 0 0 1 0-1.5H9V3.75zM6.75 7.25h10.5l-.7 11.036A2.75 2.75 0 0 1 13.812 21H10.19a2.75 2.75 0 0 1-2.738-2.714L6.75 7.25z" clipRule="evenodd" /></svg>
                  </button>
                </td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && tab==='ips' && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Endereços IP</h2>
          <div className="grid md:grid-cols-5 gap-3 mb-3">
            <input value={ipAddress} onChange={e=>setIpAddress(e.target.value)} placeholder="Endereço (ex: 192.168.1.10)" className="bg-black border border-gray-800 rounded px-2 py-1 text-sm" />
            <select value={ipSubnetId} onChange={e=>setIpSubnetId(e.target.value)} className="bg-black border border-gray-800 rounded px-2 py-1 text-sm">
              <option value="">Selecione a sub-rede</option>
              {subnets.map(n => <option key={n.id} value={n.id}>{n.cidr} {n.name?`(${n.name})`:''}</option>)}
            </select>
            <select value={ipDeviceId} onChange={e=>setIpDeviceId(e.target.value)} className="bg-black border border-gray-800 rounded px-2 py-1 text-sm">
              <option value="">Sem dispositivo</option>
              {devices.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <input value={ipFqdn} onChange={e=>setIpFqdn(e.target.value)} placeholder="FQDN (opcional)" className="bg-black border border-gray-800 rounded px-2 py-1 text-sm" />
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400">Status</label>
              <select value={ipStatus} onChange={e=>setIpStatus(e.target.value)} className="bg-black border border-gray-800 rounded px-2 py-1 text-sm">
                {['AVAILABLE','RESERVED','ASSIGNED'].map(s=> <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={addIP} className="ml-auto bg-blue-600 rounded text-sm px-3 py-1">Adicionar</button>
            </div>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input
              value={ipSearchTerm}
              onChange={(e)=>setIpSearchTerm(e.target.value)}
              placeholder="Buscar IP, FQDN, Tipo, Usuário PPP, MAC, Interface..."
              className="w-full md:w-96 bg-black border border-gray-800 rounded px-3 py-2 text-sm"
            />
            <button onClick={()=>setIpSearchTerm('')} className="bg-gray-800 px-3 py-2 rounded text-sm">Limpar</button>
          </div>
          <table className="min-w-full divide-y divide-gray-800 text-sm">
            <thead>
              <tr>
                <th className="px-2 py-2 text-left">Endereço</th>
                <th className="px-2 py-2 text-left">Sub-rede</th>
                <th className="px-2 py-2 text-left">Dispositivo</th>
                <th className="px-2 py-2 text-left">FQDN</th>
                <th className="px-2 py-2 text-left">Tipo</th>
                <th className="px-2 py-2 text-left">Usuário PPP</th>
                <th className="px-2 py-2 text-left">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {ips.map(ip => (
                <tr key={ip.id}>
                  <td className="px-2 py-2">{ip.address}</td>
                  <td className="px-2 py-2">{subnets.find(n=>n.id===ip.subnetId)?.cidr}</td>
                  <td className="px-2 py-2">{devices.find(d=>d.id===ip.deviceId)?.name||''}</td>
                  <td className="px-2 py-2">{ip.fqdn||''}</td>
                  <td className="px-2 py-2">
                    {ip.purpose ? (
                      <span className={`px-2 py-0.5 rounded text-xs ${ip.purpose==='PPPoE' ? 'bg-amber-600 text-white' : ip.purpose==='L2TP' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                        {ip.purpose}
                      </span>
                    ) : ''}
                  </td>
                  <td className="px-2 py-2">{(ip as any).pppName || ''}</td>
                  <td className="px-2 py-2">{ip.status}</td>
                  <td className="px-2 py-2 text-right">
                  <button
                    onClick={()=>setDeleteTarget({ resource:'ips', id:ip.id, label:ip.address })}
                    className="inline-flex items-center justify-center p-2 rounded hover:bg-red-500/10 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                    aria-label={`Excluir ${ip.address}`}
                    title="Excluir"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M9 3.75A1.75 1.75 0 0 1 10.75 2h2.5A1.75 1.75 0 0 1 15 3.75V5h3.25a.75.75 0 0 1 0 1.5H5.75a.75.75 0 0 1 0-1.5H9V3.75zM6.75 7.25h10.5l-.7 11.036A2.75 2.75 0 0 1 13.812 21H10.19a2.75 2.75 0 0 1-2.738-2.714L6.75 7.25z" clipRule="evenodd" /></svg>
                  </button>
                </td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && tab==='services' && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Serviços / Portas</h2>
          <div className="grid md:grid-cols-5 gap-3 mb-3">
            <select value={svcDeviceId} onChange={e=>setSvcDeviceId(e.target.value)} className="bg-black border border-gray-800 rounded px-2 py-1 text-sm">
              <option value="">Selecione o dispositivo</option>
              {devices.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <input value={svcName} onChange={e=>setSvcName(e.target.value)} placeholder="Nome" className="bg-black border border-gray-800 rounded px-2 py-1 text-sm" />
            <select value={svcProto} onChange={e=>setSvcProto(e.target.value)} className="bg-black border border-gray-800 rounded px-2 py-1 text-sm">
              {['TCP','UDP','SCTP','ICMP','OTHER'].map(p=> <option key={p} value={p}>{p}</option>)}
            </select>
            <input value={svcPort} onChange={e=>setSvcPort(e.target.value)} placeholder="Porta" className="bg-black border border-gray-800 rounded px-2 py-1 text-sm" />
            <div className="flex items-center gap-2">
              <input value={svcExtPort} onChange={e=>setSvcExtPort(e.target.value)} placeholder="Porta externa (NAT)" className="bg-black border border-gray-800 rounded px-2 py-1 text-sm" />
              <button onClick={addService} className="ml-auto bg-blue-600 rounded text-sm px-3 py-1">Adicionar</button>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-800 text-sm">
            <thead><tr><th className="px-2 py-2 text-left">Dispositivo</th><th className="px-2 py-2 text-left">Nome</th><th className="px-2 py-2 text-left">Protocolo</th><th className="px-2 py-2 text-left">Porta</th><th className="px-2 py-2 text-left">Externa</th><th></th></tr></thead>
            <tbody className="divide-y divide-gray-800">
              {services.map(s => (
                <tr key={s.id}><td className="px-2 py-2">{devices.find(d=>d.id===s.deviceId)?.name||''}</td><td className="px-2 py-2">{s.name}</td><td className="px-2 py-2">{s.protocol}</td><td className="px-2 py-2">{s.port}</td><td className="px-2 py-2">{s.externalPort||''}</td><td className="px-2 py-2 text-right">
                  <button
                    onClick={()=>setDeleteTarget({ resource:'services', id:s.id, label:s.name })}
                    className="inline-flex items-center justify-center p-2 rounded hover:bg-red-500/10 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                    aria-label={`Excluir ${s.name}`}
                    title="Excluir"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M9 3.75A1.75 1.75 0 0 1 10.75 2h2.5A1.75 1.75 0 0 1 15 3.75V5h3.25a.75.75 0 0 1 0 1.5H5.75a.75.75 0 0 1 0-1.5H9V3.75zM6.75 7.25h10.5l-.7 11.036A2.75 2.75 0 0 1 13.812 21H10.19a2.75 2.75 0 0 1-2.738-2.714L6.75 7.25z" clipRule="evenodd" /></svg>
                  </button>
                </td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={()=>!deleting && setDeleteTarget(null)} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-md text-white">
            <h2 className="text-xl font-semibold mb-2">Excluir</h2>
            <p className="text-gray-300">Tem certeza que deseja excluir <span className="font-semibold">{deleteTarget.label || deleteTarget.id}</span>? Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3 justify-end mt-6">
              <button disabled={deleting} onClick={()=>setDeleteTarget(null)} className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50">Cancelar</button>
              <button disabled={deleting} onClick={confirmDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded disabled:opacity-50">{deleting? 'Excluindo...' : 'Excluir'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
