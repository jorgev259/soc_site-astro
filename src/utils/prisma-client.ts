import { PrismaClient } from '@/prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PORT, DATABASE_PWD, DATABASE_USER } from 'astro:env/server'

const adapter = new PrismaMariaDb({
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USER,
  password: DATABASE_PWD,
  database: DATABASE_NAME,
  connectionLimit: 10
})
const prismaClient = new PrismaClient({ adapter, log: ['error'] })

export default prismaClient
