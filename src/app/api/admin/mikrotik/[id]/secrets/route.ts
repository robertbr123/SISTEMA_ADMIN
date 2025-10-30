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
    if (!session || session.user.role !== 'admin') {
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

    // Get PPP secrets from device
    const result = await withMikrotikConnection({
      id: device.id,
      name: device.name,
      ip: device.ip,
      mac: device.mac || undefined,
      username: device.username,
      password: device.password,
      port: device.port
    }, async (manager: any) => {
      const secrets = await manager.getPPPSecrets()
      return secrets
    })

    return NextResponse.json({ secrets: result })
  } catch (error) {
    console.error('Error fetching PPP secrets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch PPP secrets' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const deviceId = params.id
    const body = await request.json()

    // Validate required fields
    const { name, password, service = 'pppoe', profile = 'default' } = body
    if (!name || !password) {
      return NextResponse.json(
        { error: 'Name and password are required' },
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

    // Add PPP secret to device
    const result = await withMikrotikConnection({
      id: device.id,
      name: device.name,
      ip: device.ip,
      mac: device.mac || undefined,
      username: device.username,
      password: device.password,
      port: device.port
    }, async (manager: any) => {
      const addResult = await manager.addPPPSecret({
        name,
        password,
        service,
        profile,
        callerId: body.callerId,
        routes: body.routes,
        comment: body.comment
      })
      return addResult
    })

    return NextResponse.json({
      success: true,
      message: 'PPP secret added successfully',
      result
    })
  } catch (error) {
    console.error('Error adding PPP secret:', error)
    return NextResponse.json(
      { error: 'Failed to add PPP secret' },
      { status: 500 }
    )
  }
}