import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import prismaClient from 'utils/prisma-client'

import { Status, slug, decode } from 'utils/form'
import { hasPermission } from 'auth/auth-server'

const CreateStudio = z.object({
  name: z.string()
})

export const POST: APIRoute = async ({ request, locals }) => {
  const { user } = locals
  const hasPublish = await hasPermission(user?.id, { cms: ['publish'] })
  if (!user || !hasPublish) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = CreateStudio.parse(formData)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  try {
    const studio = await prismaClient.studio.create({
      data: {
        slug: slug(body.name),
        name: body.name
      }
    })

    return Status(200, studio.slug)
  } catch (err) {
    console.error(err)
    return Status(500, (err as Error).message)
  }
}
