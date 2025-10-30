import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { withMikrotikConnection } from '@/lib/mikrotik/manager'

function ipInCidr(ip: string, cidr: string) {
  // IPv4 only simple check
  const [net, bitsStr] = cidr.split('/')
  const bits = Number(bitsStr)
  if (!net || isNaN(bits)) return false
  const ipToInt = (s: string) => s.split('.').reduce((acc, part) => (acc << 8) + (Number(part) & 255), 0) >>> 0
  if (ip.includes(':')) return false // skip IPv6 for now
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
  const body = await req.json().catch(()=> ({} as any))
  const createSubnets = !!body.createSubnets

  // Load all subnets once
  const subnets = await (prisma as any).networkSubnet.findMany({ select: { id: true, cidr: true } }).catch(() => [])
  const devices = await prisma.mikrotikDevice.findMany().catch(() => [])

  const report: any = { processed: 0, createdIPs: 0, updatedIPs: 0, createdDevices: 0, updatedDevices: 0, errors: [] as string[] }

  // Ensure NetworkDevice.mac column exists (SQLite)
  try {
    const cols: any[] = await (prisma as any).$queryRawUnsafe('PRAGMA table_info("NetworkDevice");')
    const hasMac = cols?.some((c: any) => (c.name || c.cid || c[1]) === 'mac' || c.name === 'mac')
    if (!hasMac) {
      await (prisma as any).$executeRawUnsafe('ALTER TABLE "NetworkDevice" ADD COLUMN "mac" TEXT;')
    }
  } catch (e: any) {
    report.errors.push('mac column check/add failed: ' + (e?.message || String(e)))
  }

  // Ensure NetworkIP.pppName column exists (SQLite)
  try {
    const cols: any[] = await (prisma as any).$queryRawUnsafe('PRAGMA table_info("NetworkIP");')
    const hasPPP = cols?.some((c: any) => (c.name || c.cid || c[1]) === 'pppName' || c.name === 'pppName')
    if (!hasPPP) {
      await (prisma as any).$executeRawUnsafe('ALTER TABLE "NetworkIP" ADD COLUMN "pppName" TEXT;')
    }
  } catch (e: any) {
    report.errors.push('pppName column check/add failed: ' + (e?.message || String(e)))
  }

  for (const d of devices) {
    try {
      await withMikrotikConnection({ id: d.id, name: d.name, ip: d.ip, username: d.username, password: d.password, port: d.port, mac: d.mac || undefined } as any, async (mgr: any) => {
        const [sysinfo, ifaceIPs, ifaces, arp, dhcp, services, pppActive] = await Promise.all([
          mgr.getSystemInfo(),
          mgr.getIPAddresses(),
          mgr.getInterfaces(),
          mgr.getARP(),
          mgr.getDHCPLeases(),
          mgr.getIpServices(),
          mgr.getPPPConnections()
        ])
        const now = new Date()

        // Ensure a NetworkDevice exists for this Mikrotik (type ROUTER) and its management IP is recorded
        let netDev = await (prisma as any).networkDevice.findFirst({ where: { OR: [ { mgmtIp: d.ip }, { name: d.name } ] } })
        const deviceData = {
          name: d.name,
          type: 'ROUTER',
          mgmtIp: d.ip,
          vendor: 'MikroTik',
          model: (sysinfo?.model ?? null),
          osVersion: (sysinfo?.version ?? null),
        }
        if (!netDev) {
          netDev = await (prisma as any).networkDevice.create({ data: deviceData })
          report.createdDevices++
        } else {
          // Update basic fields if changed
          const updated = await (prisma as any).networkDevice.update({ where: { id: netDev.id }, data: deviceData })
          netDev = updated
          report.updatedDevices++
        }

        // Determine a MAC for the device: prefer MikrotikDevice.mac, else first interface mac
        const routerMac = d.mac || (ifaces?.find((x: any)=> x.macAddress)?.macAddress) || null
        if (routerMac) {
          try {
            await (prisma as any).$executeRawUnsafe('UPDATE "NetworkDevice" SET mac = ? WHERE id = ?', routerMac, netDev.id)
          } catch (e:any) {
            report.errors.push(`Set mac failed for ${d.name}: ${e?.message||e}`)
          }
        }

        // Ensure mgmt IP exists in NetworkIP and link to device
        const mgmtSubnet = subnets.find((s: any) => ipInCidr(d.ip, s.cidr))
        if (mgmtSubnet) {
          const existingMgmt = await (prisma as any).networkIP.findFirst({ where: { address: d.ip, subnetId: mgmtSubnet.id } })
          if (existingMgmt) {
            await (prisma as any).networkIP.update({ where: { id: existingMgmt.id }, data: { deviceId: netDev.id, status: 'ASSIGNED', lastSeen: now, fqdn: existingMgmt.fqdn || null, mac: existingMgmt.mac || null } })
          } else {
            await (prisma as any).networkIP.create({ data: { address: d.ip, subnetId: mgmtSubnet.id, deviceId: netDev.id, status: 'ASSIGNED', lastSeen: now } })
            report.createdIPs++
          }
        } else if (createSubnets && d.ip && d.ip.indexOf('.')>0) {
          // Create /24 for mgmt if allowed
          const parts = d.ip.split('.')
          const cidr = `${parts[0]}.${parts[1]}.${parts[2]}.0/24`
          try {
            const createdSubnet = await (prisma as any).networkSubnet.create({ data: { cidr } })
            subnets.push({ id: createdSubnet.id, cidr })
            const existingMgmt = await (prisma as any).networkIP.findFirst({ where: { address: d.ip, subnetId: createdSubnet.id } })
            if (!existingMgmt) {
              await (prisma as any).networkIP.create({ data: { address: d.ip, subnetId: createdSubnet.id, deviceId: netDev.id, status: 'ASSIGNED', lastSeen: now } })
              report.createdIPs++
            }
          } catch(e:any) {
            report.errors.push(`Create mgmt subnet failed: ${e?.message||e}`)
          }
        }

        // Insert IPs from interfaces (/ip/address/print)
        for (const a of ifaceIPs || []) {
          if (!a.address) continue
          const [addr] = String(a.address).split('/')
          if (!addr) continue
          let sub = subnets.find((s: any) => ipInCidr(addr, s.cidr))
          if (!sub && createSubnets && addr.indexOf('.')>0) {
            const parts = addr.split('.')
            const cidr = `${parts[0]}.${parts[1]}.${parts[2]}.0/24`
            try {
              const createdSubnet = await (prisma as any).networkSubnet.create({ data: { cidr, name: a.interface } })
              sub = { id: createdSubnet.id, cidr }
              subnets.push(sub)
            } catch (e:any) { report.errors.push(`Create iface subnet failed: ${e?.message||e}`) }
          }
          if (!sub) continue
          const existing = await (prisma as any).networkIP.findFirst({ where: { address: addr, subnetId: sub.id } })
          if (existing) {
            await (prisma as any).networkIP.update({ where: { id: existing.id }, data: { deviceId: netDev.id, status: 'ASSIGNED', lastSeen: now, interface: a.interface } })
            report.updatedIPs++
          } else {
            await (prisma as any).networkIP.create({ data: { address: addr, subnetId: sub.id, deviceId: netDev.id, status: 'ASSIGNED', lastSeen: now, interface: a.interface } })
            report.createdIPs++
          }
        }

        const candidateRows: Array<{ ip: string, mac?: string, fqdn?: string }> = []
        for (const a of arp || []) {
          if (a.address) candidateRows.push({ ip: a.address, mac: a['mac-address'] })
        }
        for (const l of dhcp || []) {
          if (l.address) candidateRows.push({ ip: l.address, mac: l['mac-address'], fqdn: l['host-name'] || l['active-host-name'] })
        }

        for (const row of candidateRows) {
          const sub = subnets.find((s: any) => ipInCidr(row.ip, s.cidr))
          let targetSubnet = sub
          if (!targetSubnet && createSubnets && row.ip.indexOf('.')>0) {
            const parts = row.ip.split('.')
            const cidr = `${parts[0]}.${parts[1]}.${parts[2]}.0/24`
            try {
              const createdSubnet = await (prisma as any).networkSubnet.create({ data: { cidr } })
              targetSubnet = { id: createdSubnet.id, cidr }
              subnets.push(targetSubnet)
            } catch(e:any) { report.errors.push(`Create subnet failed: ${e?.message||e}`) }
          }
          if (!targetSubnet) continue
          report.processed++
          try {
            const existing = await (prisma as any).networkIP.findFirst({ where: { address: row.ip, subnetId: targetSubnet.id } })
            // Try to find device by MAC if present
            let deviceIdByMac: string | null = null
            if (row.mac) {
              try {
                const rows: any[] = await (prisma as any).$queryRawUnsafe('SELECT id FROM "NetworkDevice" WHERE mac = ?', row.mac)
                if (rows && rows[0]?.id) deviceIdByMac = rows[0].id as string
              } catch {}
            }
            if (existing) {
              await (prisma as any).networkIP.update({ where: { id: existing.id }, data: { mac: row.mac || existing.mac, fqdn: row.fqdn || existing.fqdn, lastSeen: now, status: 'ASSIGNED', deviceId: deviceIdByMac || (row.ip === d.ip ? netDev.id : existing.deviceId) } })
              report.updatedIPs++
            } else {
              await (prisma as any).networkIP.create({ data: { address: row.ip, subnetId: targetSubnet.id, mac: row.mac || null, fqdn: row.fqdn || null, status: 'ASSIGNED', lastSeen: now, deviceId: deviceIdByMac || (row.ip === d.ip ? netDev.id : null) } })
              report.createdIPs++
            }
          } catch (e: any) {
            report.errors.push(`IP ${row.ip} error: ${e?.message || String(e)}`)
          }
        }

        // Mark PPP connections (PPPoE/L2TP) on IPs
        for (const sess of (pppActive || [])) {
          const ip = sess.address
          const service = (sess.service || '').toString().toLowerCase()
          if (!ip) continue
          let type: string | null = null
          if (service === 'pppoe') type = 'PPPoE'
          else if (service === 'l2tp') type = 'L2TP'
          if (!type) continue

          let targetSubnet = subnets.find((s: any) => ipInCidr(ip, s.cidr))
          if (!targetSubnet && createSubnets && ip.indexOf('.')>0) {
            const parts = ip.split('.')
            const cidr = `${parts[0]}.${parts[1]}.${parts[2]}.0/24`
            try {
              const createdSubnet = await (prisma as any).networkSubnet.create({ data: { cidr } })
              targetSubnet = { id: createdSubnet.id, cidr }
              subnets.push(targetSubnet)
            } catch(e:any) { report.errors.push(`Create PPP subnet failed: ${e?.message||e}`) }
          }
          if (!targetSubnet) continue

          // Try to link by MAC if available via caller-id
          let deviceIdByMac: string | null = null
          const caller = sess['caller-id'] || sess.caller || ''
          if (caller) {
            try {
              const rows: any[] = await (prisma as any).$queryRawUnsafe('SELECT id FROM "NetworkDevice" WHERE mac = ?', caller)
              if (rows && rows[0]?.id) deviceIdByMac = rows[0].id as string
            } catch {}
          }

          const pppName = (sess.name || sess.user || '').toString() || null

          const existing = await (prisma as any).networkIP.findFirst({ where: { address: ip, subnetId: targetSubnet.id } })
          if (existing) {
            await (prisma as any).networkIP.update({ where: { id: existing.id }, data: { purpose: type, pppName, status: 'ASSIGNED', lastSeen: now, deviceId: deviceIdByMac || existing.deviceId } })
            report.updatedIPs++
          } else {
            await (prisma as any).networkIP.create({ data: { address: ip, subnetId: targetSubnet.id, purpose: type, pppName, status: 'ASSIGNED', lastSeen: now, deviceId: deviceIdByMac } })
            report.createdIPs++
          }
        }

        // Upsert services (assume TCP)
        for (const svc of services || []) {
          if (!svc.name || !svc.port) continue
          try {
            const existingSvc = await (prisma as any).networkService.findFirst({ where: { deviceId: netDev.id, name: svc.name } })
            const data = { deviceId: netDev.id, name: svc.name, protocol: 'TCP', port: svc.port, enabled: !svc.disabled }
            if (existingSvc) {
              await (prisma as any).networkService.update({ where: { id: existingSvc.id }, data })
            } else {
              await (prisma as any).networkService.create({ data })
            }
          } catch(e:any) {
            report.errors.push(`Service ${svc.name} upsert failed: ${e?.message||e}`)
          }
        }
      })
    } catch (e: any) {
      report.errors.push(`Device ${d.name} error: ${e?.message || String(e)}`)
    }
  }

  return NextResponse.json(report)
}
