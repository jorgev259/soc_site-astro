import { Role, type Prisma } from '@prisma/client'

export default async function MigrationFn(tx: Prisma.TransactionClient) {
  const donators = await tx.user_Role.findMany({ where: { roleName: 'Donator' } })
  console.log(`Found ${donators.length} donators`)

  await Promise.all(
    donators.map(async (d) => {
      await tx.users.updateMany({ where: { id: d.userUsername }, data: { role: Role.user } })
    })
  )

  console.log('Migrated donator users')
}
