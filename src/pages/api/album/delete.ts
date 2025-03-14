import type { APIRoute } from 'astro'
import * as s from 'superstruct'

import prismaClient from 'utils/prisma-client'
import { Status, parseForm } from 'utils/form'

const DeleteAlbum = s.object({ albumId: s.number() })

export const POST: APIRoute = async ({ request, locals }) => {
  const { session, permissions, user } = locals

  if (!session || !user) return Status(401)
  if (!permissions.includes('CREATE')) return Status(403)

  let body
  try {
    const formData = await parseForm(request)
    body = s.create(formData, DeleteAlbum)
    await prismaClient.albums.findUniqueOrThrow({ where: { id: body.albumId }, select: { id: true } })
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  try {
    await prismaClient.albums.delete({ where: { id: body.albumId } })
    return Status(200, body.albumId.toString())
  } catch (err) {
    console.error(err)
    return Status(500, (err as Error).message)
  }
}
