import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type SearchItem = {
  type: string
  id: string | number
  title: string
  subtitle?: string
  url: string
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim()

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] as SearchItem[] })
  }

  const lc = q.toLowerCase()

  const out: SearchItem[] = []

  try {
    // Users (basic)
    const users = await prisma.user.findMany({
      where: { OR: [{ name: { contains: q } }, { email: { contains: q } }] },
      take: 5,
      select: { id: true, name: true, email: true }
    })
    for (const u of users) out.push({ type: 'user', id: u.id, title: u.name, subtitle: u.email || undefined, url: `/admin/clientes/${u.id}` })
  } catch {}

  try {
    // Domains
    const domains = await (prisma as any).domain.findMany({
      where: { name: { contains: q } },
      take: 8,
      select: { id: true, name: true, status: true }
    })
    for (const d of domains) out.push({ type: 'domain', id: d.id, title: d.name, subtitle: d.status || undefined, url: `/admin/dominios?domain=${encodeURIComponent(d.name)}` })
  } catch {}

  try {
    // Proxmox VMs (from DB if persisted)
    const vms = await (prisma as any).proxmoxVM.findMany({
      where: { OR: [{ name: { contains: q } }, { vmid: isNaN(Number(q)) ? undefined : Number(q) }] },
      take: 10,
      select: { id: true, vmid: true, name: true, nodeName: true }
    })
    for (const v of vms) out.push({ type: 'vm', id: v.id, title: `${v.name || 'vm-'+v.vmid}`, subtitle: `vmid=${v.vmid} node=${v.nodeName}`, url: `/admin/virtualizacao?focus=${encodeURIComponent(String(v.vmid))}` })
  } catch {}

  // Network inventory (Sites, VLANs, Subnets, Devices, IPs, Services)
  try {
    const sites = await (prisma as any).site.findMany({ where: { OR: [{ name: { contains: q } }, { address: { contains: q } }] }, take: 5 })
    for (const s of sites) out.push({ type: 'site', id: s.id, title: s.name, subtitle: s.address || undefined, url: '/admin/rede' })
  } catch {}
  try {
    const vlans = await (prisma as any).vlan.findMany({ where: { OR: [{ name: { contains: q } }, { vid: isNaN(Number(q)) ? undefined : Number(q) }] }, take: 8 })
    for (const v of vlans) out.push({ type: 'vlan', id: v.id, title: `${v.name} (VID ${v.vid})`, url: '/admin/rede' })
  } catch {}
  try {
    const subnets = await (prisma as any).networkSubnet.findMany({ where: { OR: [{ cidr: { contains: q } }, { name: { contains: q } }] }, take: 10 })
    for (const n of subnets) out.push({ type: 'subnet', id: n.id, title: n.cidr, subtitle: n.name || undefined, url: '/admin/rede' })
  } catch {}
  try {
    const devices = await (prisma as any).networkDevice.findMany({ where: { OR: [{ name: { contains: q } }, { vendor: { contains: q } }, { model: { contains: q } }] }, take: 10 })
    for (const d of devices) out.push({ type: 'device', id: d.id, title: d.name, subtitle: d.mgmtIp || undefined, url: '/admin/rede' })
  } catch {}
  try {
    const ips = await (prisma as any).networkIP.findMany({ where: { OR: [{ address: { contains: q } }, { fqdn: { contains: q } }] }, take: 12 })
    for (const ip of ips) out.push({ type: 'ip', id: ip.id, title: ip.address, subtitle: ip.fqdn || undefined, url: '/admin/rede' })
  } catch {}
  try {
    const svcs = await (prisma as any).networkService.findMany({ where: { OR: [{ name: { contains: q } }, { port: isNaN(Number(q)) ? undefined : Number(q) }] }, take: 10 })
    for (const s of svcs) out.push({ type: 'service', id: s.id, title: `${s.name} :${s.port}/${s.protocol}`, url: '/admin/rede' })
  } catch {}

  return NextResponse.json({ results: out.slice(0, 50) })
}
