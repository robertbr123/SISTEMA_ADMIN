import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { proxmoxGet, ProxmoxServerConfig } from '@/lib/proxmox/client'

function ipInCidr(ip: string, cidr: string) {
  const [net, bitsStr] = cidr.split('/')
  const bits = Number(bitsStr)
  if (!net || isNaN(bits)) return false
  if (ip.includes(':')) return false
  const ipToInt = (s: string) => s.split('.').reduce((acc, p) => (acc << 8) + (Number(p) & 255), 0) >>> 0
  try {
    const ipInt = ipToInt(ip)
    const netInt = ipToInt(net)
    const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0
    return (ipInt & mask) === (netInt & mask)
  } catch { return false }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const subnets = await (prisma as any).networkSubnet.findMany({ select: { id: true, cidr: true } }).catch(() => [])
  const servers = await prisma.proxmoxServer.findMany().catch(() => [])
  const report: any = { processed: 0, createdIPs: 0, updatedIPs: 0, createdDevices: 0, errors: [] as string[] }

  for (const s of servers) {
    const serverConfig: ProxmoxServerConfig = { baseUrl: s.baseUrl, user: s.user, tokenId: s.tokenId, tokenSecret: s.tokenSecret, insecure: s.insecure }
    try {
      const vmList = await proxmoxGet<any[]>('/cluster/resources?type=vm', serverConfig)
      const vms = (vmList?.data || [])
      for (const v of vms) {
        if (v.type !== 'qemu') continue // focus qemu for agent
        try {
          const agent = await proxmoxGet<any>(`/nodes/${encodeURIComponent(v.node)}/qemu/${encodeURIComponent(String(v.vmid))}/agent/network-get-interfaces`, serverConfig)
          const result = (agent as any)?.data?.result || (agent as any)?.data || []
          const addrs: string[] = []
          for (const iface of result || []) {
            const ipas = iface['ip-addresses'] || []
            for (const a of ipas) {
              const ip = a['ip-address']
              if (ip && !ip.startsWith('127.') && !ip.startsWith('169.254.') && !ip.includes(':')) addrs.push(ip)
            }
          }
          if (addrs.length === 0) continue

          // Ensure device entry for VM
          let device = await (prisma as any).networkDevice.findFirst({ where: { name: v.name || `vm-${v.vmid}`, type: 'VM' } })
          if (!device) {
            device = await (prisma as any).networkDevice.create({ data: { name: v.name || `vm-${v.vmid}`, type: 'VM', notes: `Proxmox vmid=${v.vmid} node=${v.node}` } })
            report.createdDevices++
          }

          for (const ip of addrs) {
            const sub = subnets.find((sn: any) => ipInCidr(ip, sn.cidr))
            if (!sub) continue
            report.processed++
            const existing = await (prisma as any).networkIP.findFirst({ where: { address: ip, subnetId: sub.id } })
            if (existing) {
              await (prisma as any).networkIP.update({ where: { id: existing.id }, data: { deviceId: device.id, status: 'ASSIGNED', lastSeen: new Date() } })
              report.updatedIPs++
            } else {
              await (prisma as any).networkIP.create({ data: { address: ip, subnetId: sub.id, deviceId: device.id, status: 'ASSIGNED', lastSeen: new Date() } })
              report.createdIPs++
            }
          }
        } catch (e: any) {
          // guest agent might be disabled; ignore
          report.errors.push(`VM ${v.vmid} agent error: ${e?.message || String(e)}`)
        }
      }
    } catch (e: any) {
      report.errors.push(`Server ${s.name} error: ${e?.message || String(e)}`)
    }
  }

  return NextResponse.json(report)
}
