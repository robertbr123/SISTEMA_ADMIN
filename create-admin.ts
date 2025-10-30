import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 12)

    const admin = await prisma.user.upsert({
      where: { email: 'admin@linket.com' },
      update: {},
      create: {
        name: 'Administrador',
        email: 'admin@linket.com',
        password: hashedPassword,
        role: 'admin' as any,
        phone: '11999999999',
      }
    })

    console.log('Usuário admin criado:', admin)
  } catch (error) {
    console.error('Erro ao criar admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()