import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: { id: string }
}

// GET /api/admin/mikrotik/[id] - Obter dispositivo específico
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const device = await prisma.mikrotikDevice.findUnique({
      where: { id: params.id }
    })

    if (!device) {
      return NextResponse.json({ error: 'Dispositivo não encontrado' }, { status: 404 })
    }

    return NextResponse.json(device)
  } catch (error) {
    console.error('Error fetching Mikrotik device:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/admin/mikrotik/[id] - Atualizar dispositivo
export async function PUT(request: NextRequest, { params }: RouteParams) {
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

    // Verificar se o dispositivo existe
    const existingDevice = await prisma.mikrotikDevice.findUnique({
      where: { id: params.id }
    })

    if (!existingDevice) {
      return NextResponse.json({ error: 'Dispositivo não encontrado' }, { status: 404 })
    }

    // Verificar se já existe outro dispositivo com este IP
    const duplicateDevice = await prisma.mikrotikDevice.findFirst({
      where: {
        ip,
        id: { not: params.id }
      }
    })

    if (duplicateDevice) {
      return NextResponse.json(
        { error: 'Já existe outro dispositivo com este IP' },
        { status: 400 }
      )
    }

    const device = await prisma.mikrotikDevice.update({
      where: { id: params.id },
      data: {
        name,
        ip,
        mac,
        username,
        password,
        port: port || 8728
      }
    })

    return NextResponse.json(device)
  } catch (error) {
    console.error('Error updating Mikrotik device:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/admin/mikrotik/[id] - Remover dispositivo
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verificar se o dispositivo existe
    const device = await prisma.mikrotikDevice.findUnique({
      where: { id: params.id }
    })

    if (!device) {
      return NextResponse.json({ error: 'Dispositivo não encontrado' }, { status: 404 })
    }

    await prisma.mikrotikDevice.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Dispositivo removido com sucesso' })
  } catch (error) {
    console.error('Error deleting Mikrotik device:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}