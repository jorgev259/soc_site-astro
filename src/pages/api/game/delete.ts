import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import prismaClient from 'utils/prisma-client'

import { Status, decode } from 'utils/form'
import { hasPermission } from 'auth/auth-server'

const DeleteGame = z.object({ slug: z.string() })

export const POST: APIRoute = async ({ request, locals }) => {
  const { session, user } = locals

  if (!session || !user) return Status(401)
  const hasPublish = await hasPermission(user?.id, { cms: ['publish'] })
  if (!hasPublish) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = DeleteGame.parse(formData)
    await prismaClient.game.findUniqueOrThrow({ where: { slug: body.slug }, select: { slug: true } })
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  try {
    await prismaClient.game.delete({ where: { slug: body.slug } })
    return Status(200, body.slug)
  } catch (err) {
    console.error(err)
    return Status(500, (err as Error).message)
  }
}
