import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { withMikrotikConnection } from '@/lib/mikrotik/manager'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.role || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const deviceId = params.id
    const { filename } = await request.json()

    // Get device from database
    const device = await prisma.mikrotikDevice.findUnique({
      where: { id: deviceId }
    })

    if (!device) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 })
    }

    // Create backup on device
    const result = await withMikrotikConnection({
      id: device.id,
      name: device.name,
      ip: device.ip,
      mac: device.mac || undefined,
      username: device.username,
      password: device.password,
      port: device.port
    }, async (manager) => {
      const backupName = await manager.backupConfiguration(filename)
      return backupName
    })

    if (!result) {
      return NextResponse.json({
        error: 'Failed to create backup',
        success: false
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      filename: result,
      message: 'Backup created successfully'
    })
  } catch (error) {
    console.error('Backup API error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      success: false
    }, { status: 500 })
  }
}

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

    // Get backup files from device
    const result = await withMikrotikConnection({
      id: device.id,
      name: device.name,
      ip: device.ip,
      mac: device.mac || undefined,
      username: device.username,
      password: device.password,
      port: device.port
    }, async (manager) => {
      const backups = await manager.getBackupFiles()
      return backups
    })

    if (!result) {
      return NextResponse.json({
        error: 'Failed to get backup files',
        backups: []
      }, { status: 500 })
    }

    return NextResponse.json({
      backups: result
    })
  } catch (error) {
    console.error('Get backups API error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      backups: []
    }, { status: 500 })
  }
}