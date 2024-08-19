import { composeResolvers } from '@graphql-tools/resolvers-composition'

import { createLog, createUpdateLog } from '@/server/utils/log'
import { getImgColor, img } from '@/server/utils/image'
import { hasRole } from '@/server/utils/resolvers'
import { handleComplete } from '@/server/utils/requests'
import { slugify } from '@/server/utils/slugify'
import { UserInputError } from '@/next/server/utils/graphQLErrors'

const resolversComposition = { 'Mutation.*': hasRole('CREATE') }
const resolvers = {
  Mutation: {
    createAlbum: async (parent, data, { db }, info) =>
      db.transaction(async (transaction) => {
        data.artists = data.artists
          ? data.artists.map((artist) => {
              return { name: artist, slug: slugify(artist) }
            })
          : []
        await db.models.artist.bulkCreate(data.artists, {
          ignoreDuplicates: true,
          transaction
        })

        const album = await db.models.album.create(data, {
          include: [
            db.models.disc,
            db.models.store,
            {
              model: db.models.download,
              include: [db.models.link]
            }
          ],
          transaction
        })

        await Promise.all([
          album.setArtists(
            data.artists
              .filter(({ slug }) => slug.length > 0)
              .map(({ slug }) => slug),
            { transaction }
          ),
          album.setCategories(data.categories || [], { transaction }),
          album.setClassifications(data.classifications || [], { transaction }),
          album.setPlatforms(data.platforms || [], { transaction }),
          album.setGames(data.games || [], { transaction }),
          album.setAnimations(data.animations || [], { transaction }),
          album.setRelated(data.related || [], { transaction }),
          createLog(db, 'createAlbum', data, transaction)
        ])

        const { id } = album.dataValues
        album.placeholder = data.cover
          ? await img(data.cover, 'album', id)
          : undefined
        album.headerColor = data.cover
          ? await getImgColor(`album/${id}`)
          : undefined

        await album.save({ transaction })

        if (album.status === 'show') handleComplete(db, data, album)

        return album
      }),

    deleteAlbum: async (parent, { id }, { db }, info) => {
      const album = await db.models.album.findByPk(id)
      if (!album) throw UserInputError('Not Found')

      return db.transaction(async (transaction) => {
        await createUpdateLog(db, 'deleteAlbum', album, transaction)
        await album.destroy({ transaction })
        return 1
      })
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
