import type { APIRoute } from 'astro'
import * as s from 'superstruct'
import prismaClient from 'utils/prisma-client'

import { Status, parseForm } from 'utils/form'
import { EditRequest } from 'schemas/requests'
import { handleState } from 'integrations/requestCat'

export const POST: APIRoute = async ({ request, locals }) => {
  const { permissions, user } = locals
  if (!user || !permissions.includes('REQUESTS')) return Status(403)

  try {
    let body
    try {
      const formData = await parseForm(await request.formData())
      body = s.create(formData, EditRequest)
    } catch (err) {
      return Status(422, (err as Error).message)
    }

    const oldRequest = await prismaClient.requests.findUnique({ where: { id: body.id }, select: { state: true } })
    if (!oldRequest) throw Error('Request not found')

    const newRequest = await prismaClient.requests.update({
      where: { id: body.id },
      data: { ...body, updatedAt: new Date() },
      select: { id: true, reason: true, state: true }
    })

    if (oldRequest.state !== newRequest.state) {
      await handleState(newRequest.state, newRequest.id, newRequest.reason)
    }

    return Status(200, body.id.toString())
  } catch (err) {
    return Status(500, (err as Error).message)
  }
}
