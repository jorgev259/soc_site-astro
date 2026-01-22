import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import prismaClient from 'utils/prisma-client'

import { Status, slug, decode } from 'utils/form'
import { hasPermission } from 'auth/auth-server'

const CreateGame = z.object({
  name: z.string(),
  releaseDate: z.string().optional(),
  headerColor: z.string().optional()
})

export const POST: APIRoute = async ({ request, locals }) => {
  const { user } = locals
  const hasPublish = await hasPermission(user?.id, { cms: ['publish'] })
  if (!user || !hasPublish) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = CreateGame.parse(formData)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  try {
    const game = await prismaClient.game.create({
      data: {
        slug: slug(body.name),
        name: body.name,
        releaseDate: body.releaseDate ? new Date(body.releaseDate) : null,
        headerColor: body.headerColor || '#ffffff'
      }
    })

    return Status(200, game.slug)
  } catch (err) {
    console.error(err)
    return Status(500, (err as Error).message)
  }
}
