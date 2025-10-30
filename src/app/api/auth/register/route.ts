import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone, address, city, state, zipCode } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Nome, email e senha são obrigatórios' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Usuário já existe' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user', // Default role for new registrations
        phone,
        address,
        city,
        state,
        zipCode,
      }
    })

    return NextResponse.json({ message: 'Usuário criado com sucesso', userId: user.id })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}