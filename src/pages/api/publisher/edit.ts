import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import prismaClient from 'utils/prisma-client'

import { Status, decode } from 'utils/form'
import { hasPermission } from 'auth/auth-server'

const EditPublisher = z.object({
  id: z.number(),
  name: z.string().optional()
})

export const POST: APIRoute = async ({ request, locals }) => {
  const { user } = locals
  const hasUpdate = await hasPermission(user?.id, { cms: ['update'] })
  if (!user || !hasUpdate) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = EditPublisher.parse(formData)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  try {
    const publisher = await prismaClient.publisher.update({
      where: { id: body.id },
      data: { name: body.name }
    })

    return Status(200, publisher.id.toString())
  } catch (err) {
    console.error(err)
    return Status(500, (err as Error).message)
  }
}
