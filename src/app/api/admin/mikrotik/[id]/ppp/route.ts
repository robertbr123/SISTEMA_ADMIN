import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { withMikrotikConnection } from '@/lib/mikrotik/manager'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const deviceId = params.id
    const url = new URL(request.url)
    const connectionId = url.searchParams.get('connectionId')

    if (!connectionId) {
      return NextResponse.json(
        { error: 'Connection ID is required' },
        { status: 400 }
      )
    }

    // Get device from database
    const device = await prisma.mikrotikDevice.findUnique({
      where: { id: deviceId }
    })

    if (!device) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 })
    }

    // Remove PPP connection from device
    const result = await withMikrotikConnection({
      id: device.id,
      name: device.name,
      ip: device.ip,
      mac: device.mac || undefined,
      username: device.username,
      password: device.password,
      port: device.port
    }, async (manager: any) => {
      // First get active connections to find the correct one
      const connections = await manager.getPPPConnections()
      const connection = connections.find((conn: any) =>
        conn.id === connectionId ||
        conn['.id'] === connectionId ||
        conn.name === connectionId ||
        conn.user === connectionId
      )

      if (!connection) {
        throw new Error('Connection not found')
      }

      // Remove the connection using its internal .id
      const removeResult = await manager.removePPPConnection(connection['.id'] || connection.id)
      return removeResult
    })

    return NextResponse.json({
      success: true,
      message: 'PPP connection removed successfully',
      result
    })
  } catch (error) {
    console.error('Error removing PPP connection:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to remove PPP connection' },
      { status: 500 }
    )
  }
}