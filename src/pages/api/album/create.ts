import type { APIRoute } from 'astro'
import * as s from 'superstruct'
import prismaClient from 'utils/prisma-client'

import { AlbumStatus } from '@prisma/client'
import { Status, parseForm, slug } from 'utils/form'
import { writeImg, getImgColor } from 'utils/img'
import { handleComplete } from 'integrations/requestCat'
import { CreateAlbum } from 'schemas/album'

export const POST: APIRoute = async ({ request, locals }) => {
  const { session, permissions, user } = locals

  if (!session || !user) return Status(401)
  if (!permissions.includes('CREATE')) return Status(403)

  let body
  try {
    const formData = await parseForm(request)
    body = s.create(formData, CreateAlbum)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  try {
    const albumRow = await prismaClient.$transaction(async (tx) => {
      const artistRows = body.artists.map((name: string) => ({ slug: slug(name), name }))

      const albumRow = await tx.albums.create({
        data: {
          title: body.title,
          subTitle: body.subTitle,
          releaseDate: body.releaseDate ? new Date(body.releaseDate) : null,
          label: body.label,
          vgmdb: body.vgmdb,
          description: body.description,
          createdBy: user.name,
          status: body.status,
          animations: { create: body.animations.map((id) => ({ animation: { connect: { id } } })) },
          artists: {
            create: artistRows.map((a) => ({
              artist: {
                connectOrCreate: {
                  create: a,
                  where: { slug: a.slug }
                }
              }
            }))
          },
          categories: { create: body.categories.map((c) => ({ category: { connect: { name: c } } })) },
          classifications: { create: body.classifications.map((name) => ({ classification: { connect: { name } } })) },
          games: { create: body.games.map((slug) => ({ game: { connect: { slug } } })) },
          platforms: { create: body.platforms.map((id) => ({ platform: { connect: { id } } })) },
          // albumHistories
          discs: { createMany: { data: body.discs } },
          relatedAlbums: { create: body.related.map((id) => ({ relatedAlbum: { connect: { id } } })) }
        },
        include: { artists: { include: { artist: { select: { name: true } } } } }
      })

      const handleCover = async () => {
        const coverPath = await writeImg(body.cover, 'album', albumRow.id)
        const headerColor = await getImgColor(coverPath)
        await tx.albums.update({ where: { id: albumRow.id }, data: { headerColor } })
        albumRow.headerColor = headerColor
      }

      await Promise.all([
        handleCover(),
        Promise.all(
          body.downloads.map((d) =>
            tx.downloads.create({
              data: {
                title: d.title,
                albumId: albumRow.id,
                links: { create: d.links }
              }
            })
          )
        )
      ])

      return albumRow
    })

    if (albumRow.status === AlbumStatus.SHOW) await handleComplete(albumRow, body.request)

    return Status(200, albumRow.id.toString())
  } catch (err) {
    console.error(err)
    return Status(500, (err as Error).message)
  }
}
