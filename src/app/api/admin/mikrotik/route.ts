import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { withMikrotikConnection } from '@/lib/mikrotik/manager'

// GET /api/admin/mikrotik - Listar todos os dispositivos
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const refresh = url.searchParams.get('refresh') === 'true'

    const devices = await prisma.mikrotikDevice.findMany({
      orderBy: { createdAt: 'desc' }
    })

    if (refresh) {
      // Iterate devices sequentially to avoid opening many connections at once
      for (const device of devices) {
        try {
          const result = await withMikrotikConnection({
            id: device.id,
            name: device.name,
            ip: device.ip,
            mac: device.mac || undefined,
            username: device.username,
            password: device.password,
            port: device.port
          }, async (manager: any) => {
            const sys = await manager.getSystemInfo()
            return sys
          })

          if (result) {
            // compute memory percent if possible
            let memoryPercent: number | null = null
            if (typeof result.freeMemory === 'number' && typeof result.totalMemory === 'number' && result.totalMemory > 0) {
              memoryPercent = Math.round((1 - result.freeMemory / result.totalMemory) * 100)
            }

            await prisma.mikrotikDevice.update({
              where: { id: device.id },
              data: {
                status: 'online',
                model: result.model || device.model,
                version: result.version || device.version,
                uptime: result.uptime || device.uptime,
                cpu: typeof result.cpuLoad === 'number' ? result.cpuLoad : device.cpu,
                memory: memoryPercent ?? device.memory,
                lastSeen: new Date()
              }
            })
          } else {
            await prisma.mikrotikDevice.update({
              where: { id: device.id },
              data: { status: 'offline' }
            })
          }
        } catch (innerError) {
          console.error(`Error checking device ${device.id}:`, innerError)
          try {
            await prisma.mikrotikDevice.update({
              where: { id: device.id },
              data: { status: 'offline' }
            })
          } catch (uErr) {
            console.error('Error updating device status to offline:', uErr)
          }
        }
      }

      const updated = await prisma.mikrotikDevice.findMany({ orderBy: { createdAt: 'desc' } })
      return NextResponse.json(updated)
    }

    return NextResponse.json(devices)
  } catch (error) {
    console.error('Error fetching Mikrotik devices:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/admin/mikrotik - Criar novo dispositivo
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, ip, mac, username, password, port } = body

    if (!name || !ip || !username || !password) {
      return NextResponse.json(
        { error: 'Nome, IP, usuário e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se já existe um dispositivo com este nome
    const existingDevice = await prisma.mikrotikDevice.findFirst({
      where: { name }
    })

    if (existingDevice) {
      return NextResponse.json(
        { error: 'Já existe um dispositivo com este nome' },
        { status: 400 }
      )
    }

    const device = await prisma.mikrotikDevice.create({
      data: {
        name,
        ip,
        mac,
        username,
        password,
        port: port || 8728
      }
    })

    return NextResponse.json(device, { status: 201 })
  } catch (error) {
    console.error('Error creating Mikrotik device:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}