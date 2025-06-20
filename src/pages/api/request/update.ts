import type { APIRoute } from 'astro'
import * as s from 'superstruct'
import prismaClient from 'utils/prisma-client'

import { Status, parseForm } from 'utils/form'
import { EditRequest } from 'schemas/requests'

export const POST: APIRoute = async ({ request, locals }) => {
  const { permissions, user } = locals
  if (!user || !permissions.includes('REQUESTS')) return Status(403)

  let body
  try {
    const formData = await parseForm(await request.formData())
    body = s.create(formData, EditRequest)
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
