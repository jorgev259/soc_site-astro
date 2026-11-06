import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import prismaClient from 'utils/prisma-client'

import { Status, decode } from 'utils/form'
import { DownloadInput } from 'schemas/album'
import { hasPermission } from 'auth/auth-server'

const EditDownloads = z.object({
  albumId: z.coerce.number().int(),
  downloads: z.array(DownloadInput).min(1)
})

export const POST: APIRoute = async ({ request, locals }) => {
  const { user } = locals
  const hasUpdate = await hasPermission(user?.id, { cms: ['update'] })
  if (!user || !hasUpdate) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = EditDownloads.parse(formData)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  const { albumId, downloads } = body
  const album = await prismaClient.albums.findUnique({ where: { id: albumId }, select: { id: true } })
  if (!album) return Status(404, `Album ${albumId} not found`)

  try {
    await prismaClient.$transaction(async (tx) => {
      await tx.downloads.deleteMany({ where: { albumId } })
      for (const d of downloads) {
        await tx.downloads.create({
          data: {
            title: d.title,
            albumId,
            links: { create: d.links }
          }
        })
      }
    })

    return Status(200, albumId.toString())
  } catch (err) {
    console.error(err)
    return Status(500, (err as Error).message)
  }
}
