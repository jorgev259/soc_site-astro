import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import prismaClient from 'utils/prisma-client'

import { Status, decode } from 'utils/form'
import { hasPermission } from 'auth/auth-server'

const DeleteAnimation = z.object({ id: z.number() })

export const POST: APIRoute = async ({ request, locals }) => {
  const { session, user } = locals

  if (!session || !user) return Status(401)
  const hasPublish = await hasPermission(user?.id, { cms: ['publish'] })
  if (!hasPublish) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = DeleteAnimation.parse(formData)
    await prismaClient.animation.findUniqueOrThrow({ where: { id: body.id }, select: { id: true } })
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  try {
    await prismaClient.animation.delete({ where: { id: body.id } })
    return Status(200, body.id.toString())
  } catch (err) {
    console.error(err)
    return Status(500, (err as Error).message)
  }
}
