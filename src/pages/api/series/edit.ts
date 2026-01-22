import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import prismaClient from 'utils/prisma-client'

import { Status, decode } from 'utils/form'
import { hasPermission } from 'auth/auth-server'

const EditSeries = z.object({
  slug: z.string(),
  name: z.string().optional(),
  headerColor: z.string().optional()
})

export const POST: APIRoute = async ({ request, locals }) => {
  const { user } = locals
  const hasUpdate = await hasPermission(user?.id, { cms: ['update'] })
  if (!user || !hasUpdate) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = EditSeries.parse(formData)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  try {
    const series = await prismaClient.series.update({
      where: { slug: body.slug },
      data: { name: body.name, headerColor: body.headerColor }
    })

    return Status(200, series.slug)
  } catch (err) {
    console.error(err)
    return Status(500, (err as Error).message)
  }
}
