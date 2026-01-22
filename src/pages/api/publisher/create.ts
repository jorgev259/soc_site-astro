import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import prismaClient from 'utils/prisma-client'

import { Status, decode } from 'utils/form'
import { hasPermission } from 'auth/auth-server'

const CreatePublisher = z.object({
  name: z.string()
})

export const POST: APIRoute = async ({ request, locals }) => {
  const { user } = locals
  const hasPublish = await hasPermission(user?.id, { cms: ['publish'] })
  if (!user || !hasPublish) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = CreatePublisher.parse(formData)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  try {
    const publisher = await prismaClient.publisher.create({
      data: {
        name: body.name
      }
    })

    return Status(200, publisher.id.toString())
  } catch (err) {
    console.error(err)
    return Status(500, (err as Error).message)
  }
}
