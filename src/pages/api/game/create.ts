import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import { Prisma } from '@/prisma/client'
import prismaClient, { type PrismaTransactionalClient } from 'utils/prisma-client'

import { Status, slug, decode } from 'utils/form'
import { handleImg } from 'utils/img'
import { hasPermission } from 'auth/auth-server'

const CreateGame = z.object({
  cover: z.instanceof(File).optional(),
  name: z.string(),
  releaseDate: z.coerce.date().optional(),
  headerColor: z.string().optional(),
  publishers: z.array(z.string()).default([]),
  platforms: z.array(z.string()).default([]),
  series: z.array(z.string()).default([])
})

// Messages go in the body: multi-line text is not a valid statusText
const Text = (status: number, text: string) => new Response(text, { status })

const cleanNames = (names: string[]) => [...new Set(names.map((name) => name.trim()).filter(Boolean))]

// Publishers and platforms have numeric ids and non-unique names,
// so reuse the row with the same name and only create the missing ones
async function publisherIds(tx: PrismaTransactionalClient, names: string[]) {
  const ids = []
  for (const name of names) {
    const row = (await tx.publisher.findFirst({ where: { name } })) ?? (await tx.publisher.create({ data: { name } }))
    ids.push(row.id)
  }
  return ids
}

async function platformIds(tx: PrismaTransactionalClient, names: string[]) {
  const ids = []
  for (const name of names) {
    const row =
      (await tx.platform.findFirst({ where: { name } })) ?? (await tx.platform.create({ data: { name, type: 'Game' } }))
    ids.push(row.id)
  }
  return ids
}

export const POST: APIRoute = async ({ request, locals }) => {
  const { user } = locals
  const hasPublish = await hasPermission(user?.id, { cms: ['publish'] })
  if (!user || !hasPublish) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = CreateGame.parse(formData)
  } catch (err) {
    return Text(422, (err as Error).message)
  }

  const seriesRows = cleanNames(body.series).map((name) => ({ slug: slug(name), name }))

  try {
    const game = await prismaClient.$transaction(
      async (tx) => {
        const game = await tx.game.create({
          data: {
            slug: slug(body.name),
            name: body.name,
            releaseDate: body.releaseDate ?? null,
            headerColor: body.headerColor || '#ffffff',
            publishers: {
              create: (await publisherIds(tx, cleanNames(body.publishers))).map((publisherId) => ({ publisherId }))
            },
            platforms: {
              create: (await platformIds(tx, cleanNames(body.platforms))).map((platformId) => ({ platformId }))
            },
            series: {
              create: seriesRows.map((series) => ({
                series: { connectOrCreate: { create: series, where: { slug: series.slug } } }
              }))
            }
          }
        })

        if (body.cover) {
          const headerColor = await handleImg(body.cover, 'img/game', game.slug)
          if (!body.headerColor) await tx.game.update({ where: { slug: game.slug }, data: { headerColor } })
        }

        return game
      },
      { timeout: 30000 }
    )

    return Text(200, game.slug)
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return Text(409, 'Game with this name already exists')
    }
    console.error(err)
    return Text(500, (err as Error).message)
  }
}
