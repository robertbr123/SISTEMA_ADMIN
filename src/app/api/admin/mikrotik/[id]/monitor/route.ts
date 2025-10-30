import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { withMikrotikConnection } from '@/lib/mikrotik/manager'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.role || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const deviceId = params.id

    // Get device from database
    const device = await prisma.mikrotikDevice.findUnique({
      where: { id: deviceId }
    })

    if (!device) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 })
    }

    // Connect to device and get monitoring data
    const result = await withMikrotikConnection({
      id: device.id,
      name: device.name,
      ip: device.ip,
      mac: device.mac || undefined,
      username: device.username,
      password: device.password,
      port: device.port
    }, async (manager) => {
      const [systemInfo, interfaces, logs, pppActive, pppSecrets] = await Promise.all([
        manager.getSystemInfo(),
        manager.getInterfaces(),
        manager.getLogs(10),
        manager.getPPPConnections(),
        manager.getPPPSecrets()
      ])

      return {
        systemInfo,
        interfaces,
        logs,
        pppConnections: pppActive,
        pppSecrets,
        timestamp: new Date().toISOString(),
        connected: true
      }
    })

    if (!result) {
      return NextResponse.json({
        error: 'Failed to connect to device',
        connected: false
      }, { status: 500 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Monitor API error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      connected: false
    }, { status: 500 })
  }
}