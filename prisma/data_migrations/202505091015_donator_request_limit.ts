import { RequestState, type Prisma } from '@prisma/client'
import prismaClient from 'utils/prisma-client'

const LIMIT_PENDING = 5

export default async function MigrationFn(tx: Prisma.TransactionClient) {
  const donatorRequests = await tx.requests.findMany({
    where: { donator: true, state: RequestState.PENDING, userID: { not: null } }
  })
  const donatorMap = new Map<string, typeof donatorRequests>()

  donatorRequests.forEach((request) => {
    const userID = request.userID as string
    donatorMap.set(userID, [...(donatorMap.get(userID) || []), request])
  })

  const holdRequests = new Set<number>()

  for (const requests of donatorMap.values()) {
    if (requests.length <= LIMIT_PENDING) continue

    const end = requests.length - LIMIT_PENDING
    const sortedRequests = requests.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()).slice(0, end)

    sortedRequests.forEach((r) => {
      holdRequests.add(r.id)
    })
  }

  await prismaClient.requests.updateMany({
    where: { id: { in: Array.from(holdRequests) } },
    data: { state: RequestState.HOLD }
  })

  console.log(`Updated ${holdRequests.size} requests to HOLD state`)
}
