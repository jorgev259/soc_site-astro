import type { APIRoute } from 'astro'
import prismaClient from 'utils/prisma-client'

import { Status, decode } from 'utils/form'
import { EditRequest } from 'schemas/requests'
import { hasPermission } from 'auth/auth-server'

export const POST: APIRoute = async ({ request, locals }) => {
  const { user } = locals
  const hasRequest = await hasPermission(user?.id, { request: ['create'] })
  if (!user || !hasRequest) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = EditRequest.parse(formData)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  try {
    await prismaClient.requests.update({ where: { id: body.id }, data: { ...body, updatedAt: new Date() } })
    return Status(200, body.id.toString())
  } catch (err) {
    console.error(err)
    return Status(500, (err as Error).message)
  }
}
