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
const prismaClient = new PrismaClient({
  adapter,
  log: ['error'],
  // Prisma's 5s transaction default is too short for a remote database (~250ms per query): an album create runs
  // ~25 queries, and when the timeout hits mid-create the album row is rolled back, so the rest fail on its foreign key
  transactionOptions: { timeout: 30000, maxWait: 10000 }
})

export type PrismaTransactionalClient = Prisma.TransactionClient
export default prismaClient
