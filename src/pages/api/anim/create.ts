import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import prismaClient from 'utils/prisma-client'

import { Status, decode } from 'utils/form'
import { hasPermission } from 'auth/auth-server'

const CreateAnimation = z.object({
  title: z.string(),
  subTitle: z.string().optional(),
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
    body = CreateAnimation.parse(formData)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  try {
    const animation = await prismaClient.animation.create({
      data: {
        title: body.title,
        subTitle: body.subTitle || null,
        releaseDate: body.releaseDate ? new Date(body.releaseDate) : null,
        headerColor: body.headerColor || '#ffffff'
      }
    })

    return Status(200, animation.id.toString())
  } catch (err) {
    console.error(err)
    return Status(500, (err as Error).message)
  }
}
