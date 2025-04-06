import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient({ log: ['error'] })

export default prismaClient
