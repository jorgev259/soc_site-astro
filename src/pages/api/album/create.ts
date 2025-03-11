import type { APIRoute } from 'astro'
import * as s from 'superstruct'
import { AlbumStatus } from '@prisma/client'

import prismaClient from 'utils/prisma-client'
import { Status, formToObject, slug } from 'utils/form'
import { writeImg, getImgColor } from 'utils/img'
import { handleComplete } from 'integrations/requestCat'
import { DownloadInput } from 'schemas/album'

const CreateAlbum = s.object({
  cover: s.instance(File),
  title: s.optional(s.string()),
  subTitle: s.optional(s.string()),
  releaseDate: s.optional(s.string()),
  label: s.optional(s.string()),
  vgmdb: s.optional(s.string()),
  description: s.optional(s.string()),
  status: s.defaulted(s.enums(Object.values(AlbumStatus)), AlbumStatus.HIDDEN),
  animations: s.defaulted(s.array(s.integer()), []),
  artists: s.defaulted(s.array(s.string()), []),
  categories: s.defaulted(s.array(s.string()), []),
  classifications: s.defaulted(s.array(s.string()), []),
  games: s.defaulted(s.array(s.string()), []),
  platforms: s.defaulted(s.array(s.integer()), []),
  discs: s.defaulted(s.array(s.object({ number: s.integer(), body: s.string() })), []),
  downloads: s.defaulted(s.array(DownloadInput), []),
  related: s.defaulted(s.array(s.number()), []),
  stores: s.defaulted(s.array(s.object({ provider: s.string(), url: s.string() })), []),
  request: s.optional(s.integer())
})

export const POST: APIRoute = async ({ request, locals }) => {
  const { session, permissions, user } = locals

  if (!session || !user) return Status(401)
  if (!permissions.includes('CREATE')) return Status(403)

  let body
  try {
    const formData = await request.formData()
    body = s.create(formToObject(formData), CreateAlbum)
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
          releaseDate: body.releaseDate,
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
        tx.downloads.createMany({
          data: body.downloads.map((d) => ({
            title: d.title,
            small: d.small,
            albumId: albumRow.id,
            links: { create: d.links }
          }))
        })
      ])

      return albumRow
    })

    if (albumRow.status === AlbumStatus.SHOW) await handleComplete(albumRow, body.request)

    return Status(200, albumRow.id.toString())
  } catch (err) {
    return Status(500, (err as Error).message)
  }
}
