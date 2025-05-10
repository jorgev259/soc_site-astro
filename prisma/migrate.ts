import { Prisma } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import prismaClient from 'utils/prisma-client'

const require = createRequire(import.meta.url)

export type MigrationFn = (tx: Prisma.TransactionClient) => Promise<void>

interface Migration {
  id: string
  migrationFn: MigrationFn
}

const dataMigrationsPath = path.join(import.meta.dirname, 'data_migrations')
const migrationFiles = fs.readdirSync(dataMigrationsPath).filter((file) => file.endsWith('.ts'))
const migrations: Migration[] = migrationFiles
  .sort()
  .map((id) => ({ id, migrationFn: require(path.join(dataMigrationsPath, id)).default }))
  .filter((migration) => migration.migrationFn !== undefined)

if (migrations.length === 0) console.log('No data migrations to run.')

for (const { id, migrationFn } of migrations) {
  const startDate = new Date()
  const migration = await prismaClient.migration.findFirst({ where: { id } })
  if (migration === null) {
    console.log(`Migrating ${id}`)
    await prismaClient.$transaction(async (tx) => {
      await migrationFn(tx)
      await tx.migration.create({ data: { id } })
    })
    const endDate = new Date()
    console.log(`Migrated ${id} in ${(endDate.getTime() - startDate.getTime()) / 1000}s`)
  }
}
