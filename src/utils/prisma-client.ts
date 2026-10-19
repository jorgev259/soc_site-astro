import { PrismaClient, type Prisma } from '@/prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PORT, DATABASE_PWD, DATABASE_USER } from 'astro:env/server'

const adapter = new PrismaMariaDb({
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USER,
  password: DATABASE_PWD,
  database: DATABASE_NAME,
  connectionLimit: 10,
  // The driver's 1s default is too short for remote databases (e.g. over Tailscale)
  connectTimeout: 10000
})
const prismaClient = new PrismaClient({ adapter, log: ['error'] })

export type PrismaTransactionalClient = Prisma.TransactionClient
export default prismaClient
