import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import prismaClient from 'utils/prisma-client'

import { Status, decode } from 'utils/form'
import { hasPermission } from 'auth/auth-server'

const EditAnimation = z.object({
  id: z.number(),
  title: z.string().optional(),
  subTitle: z.string().optional(),
  releaseDate: z.string().optional(),
  headerColor: z.string().optional()
})

export const POST: APIRoute = async ({ request, locals }) => {
  const { user } = locals
  const hasUpdate = await hasPermission(user?.id, { cms: ['update'] })
  if (!user || !hasUpdate) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = EditAnimation.parse(formData)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  try {
    const animation = await prismaClient.animation.update({
      where: { id: body.id },
      data: {
        title: body.title,
        subTitle: body.subTitle,
        releaseDate: body.releaseDate ? new Date(body.releaseDate) : undefined,
        headerColor: body.headerColor
      }
    })

    return Status(200, animation.id.toString())
  } catch (err) {
    console.error(err)
    return Status(500, (err as Error).message)
  }
}
