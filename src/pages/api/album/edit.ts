import type { APIRoute } from 'astro'
import * as s from 'superstruct'
import prismaClient from 'utils/prisma-client'

import { Status, parseForm, slug } from 'utils/form'
import { handleCover } from 'utils/img'
import { EditAlbum } from 'schemas/album'

export const POST: APIRoute = async ({ request, locals }) => {
  const { permissions, user } = locals
  if (!user || !permissions.includes('UPDATE')) return Status(403)

  let body
  try {
    const formData = await parseForm(await request.formData())
    body = s.create(formData, EditAlbum)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  try {
    await prismaClient.$transaction(async (tx) => {
      const {
        artists,
        animations,
        categories,
        classifications,
        games,
        platforms,
        discs,
        downloads,
        stores,
        cover,
        related,
        albumId,
        ...rest
      } = body

      await tx.albums.update({
        where: { id: body.albumId },
        data: {
          ...rest,
          artists: {
            deleteMany: {},
            create: artists
              ?.split(',')
              .map((name: string) => ({ slug: slug(name.trim()), name: name.trim() }))
              .map((a) => ({
                artist: {
                  connectOrCreate: {
                    create: a,
                    where: { slug: a.slug }
                  }
                }
              }))
          },
          animations: { deleteMany: {}, create: animations?.map((id) => ({ animation: { connect: { id } } })) },
          categories: { deleteMany: {}, create: categories?.map((c) => ({ category: { connect: { name: c } } })) },
          games: { deleteMany: {}, create: games?.map((slug) => ({ game: { connect: { slug } } })) },
          platforms: { deleteMany: {}, create: platforms?.map((id) => ({ platform: { connect: { id } } })) },
          discs: { deleteMany: {}, createMany: { data: body.discs ?? [] } },
          relatedAlbums: { deleteMany: {}, create: related?.map((id) => ({ relatedAlbum: { connect: { id } } })) },
          downloads: { deleteMany: {} },
          stores: stores ? { deleteMany: {}, createMany: { data: stores } } : undefined
        }
      })

      await Promise.all([
        cover && cover.size > 0 ? handleCover(cover, 'album', albumId, tx) : undefined,
        downloads
          ? Promise.all(
              downloads.map((d) =>
                tx.downloads.create({
                  data: {
                    title: d.title,
                    albumId: albumId,
                    links: { create: d.links }
                  }
                })
              )
            )
          : undefined
      ])
    })

    // if (albumRow.status === AlbumStatus.SHOW) await handleComplete(albumRow, body.request)

    return Status(200, body.albumId.toString())
  } catch (err) {
    console.error(err)
    return Status(500, (err as Error).message)
  }
}
