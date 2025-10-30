import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: { id: string }
}

// POST /api/admin/mikrotik/[id]/test - Testar conectividade com dispositivo
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Buscar dispositivo no banco
    const device = await (prisma as any).mikrotikDevice.findUnique({
      where: { id: params.id }
    })

    if (!device) {
      return NextResponse.json({ error: 'Dispositivo não encontrado' }, { status: 404 })
    }

    try {
      // Simular teste de conectividade (em produção, implementar conexão real)
      // Por enquanto, apenas atualizar o status baseado em uma verificação simples
      const isReachable = device.ip && device.username && device.password

      if (isReachable) {
        // Atualizar status como online
        await (prisma as any).mikrotikDevice.update({
          where: { id: params.id },
          data: {
            status: 'online',
            lastSeen: new Date()
          }
        })

        return NextResponse.json({
          success: true,
          message: 'Teste de conectividade simulado com sucesso',
          data: {
            ip: device.ip,
            reachable: true
          }
        })
      } else {
        // Atualizar status como offline
        await (prisma as any).mikrotikDevice.update({
          where: { id: params.id },
          data: {
            status: 'offline',
            lastSeen: new Date()
          }
        })

        return NextResponse.json({
          success: false,
          message: 'Dispositivo não acessível - verifique as configurações',
          error: 'Credenciais ou IP inválidos'
        }, { status: 400 })
      }

    } catch (connectionError) {
      // Atualizar status como offline em caso de erro
      await (prisma as any).mikrotikDevice.update({
        where: { id: params.id },
        data: {
          status: 'offline',
          lastSeen: new Date()
        }
      })

      return NextResponse.json({
        success: false,
        message: 'Falha no teste de conectividade',
        error: connectionError instanceof Error ? connectionError.message : 'Erro desconhecido'
      }, { status: 400 })
    }

  } catch (error) {
    console.error('Error testing Mikrotik device connection:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}