import type { APIRoute } from 'astro'
import { z } from 'astro/zod'

import prismaClient from 'utils/prisma-client'
import { Status, decode } from 'utils/form'
import { hasPermission } from 'auth/auth-server'

const DeleteAlbum = z.object({ albumId: z.number() })

export const POST: APIRoute = async ({ request, locals }) => {
  const { session, user } = locals

  if (!session || !user) return Status(401)
  const hasPublish = await hasPermission(user?.id, { cms: ['publish'] })
  if (!hasPublish) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = DeleteAlbum.parse(formData)
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
