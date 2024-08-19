import { composeResolvers } from '@graphql-tools/resolvers-composition'

import { createLog, createUpdateLog } from '@/server/utils/log'
import { img, getImgColor } from '@/server/utils/image'
import { hasRole } from '@/server/utils/resolvers'
import { handleComplete } from '@/server/utils/requests'
import { slugify } from '@/server/utils/slugify'

const resolversComposition = { 'Mutation.*': hasRole('UPDATE') }
const resolvers = {
  Mutation: {
    createPublisher: async (parent, data, { db }, info) =>
      db.transaction(async (transaction) => {
        const pub = await db.models.publisher.create(data, { transaction })
        data.id = pub.id

        await createLog(db, 'createPublisher', data, transaction)

        return pub
      }),
    updatePublisher: async (parent, { id, name }, { db }, info) => {
      const pub = await db.models.publisher.findByPk(id)
      pub.name = name

      return db.transaction(async (transaction) => {
        await pub.save({ transaction })

        await createUpdateLog(db, 'updatePublisher', pub, transaction)
        return pub
      })
    },
    deletePublisher: async (parent, { id }, { db }) => {
      const pub = await db.models.publisher.findByPk(id)

      return db.transaction(async (transaction) => {
        await pub.destroy({ transaction })

        await createLog(db, 'deletePublisher', pub.dataValues, transaction)
      })
    },

    createPlatform: async (parent, data, { db }, info) =>
      db.transaction(async (transaction) => {
        const plat = db.models.platform.create(data, { transaction })
        data.id = plat.id

        await createLog(db, 'createPlatform', data, transaction)
        return plat
      }),
    updatePlatform: async (parent, { key, name, type }, { db }, info) => {
      const plat = await db.models.platform.findByPk(key)
      if (name) plat.name = name
      if (type !== plat.type) plat.type = type

      return db.transaction(async (transaction) => {
        await plat.save({ transaction })

        await createUpdateLog(db, 'updatePlatform', plat, transaction)
        return plat
      })
    },
    deletePlatform: async (parent, { key }, { db }) => {
      const plat = await db.models.platform.findByPk(key)

      return db.transaction(async (transaction) => {
        await plat.destroy({ transaction })
        await createLog(db, 'deletePlatform', plat.dataValues, transaction)
      })
    },

    createStudio: async (parent, data, { db }, info) =>
      db.transaction(async (transaction) => {
        const studio = db.models.studio.create(data, { transaction })
        data.slug = studio.slug
        await createLog(db, 'createStudio', data, transaction)
        return studio
      }),
    updateStudio: async (parent, { slug, name }, { db }, info) => {
      const studio = await db.models.studio.findByPk(slug)
      studio.name = name

      return db.transaction(async (transaction) => {
        await studio.save({ transaction })
        await createUpdateLog(db, 'updateStudio', studio, transaction)
        return studio
      })
    },
    deleteStudio: async (parent, { slug, name }, { db }, info) => {
      const studio = await db.models.studio.findByPk(slug)

      return db.transaction(async (transaction) => {
        studio.destroy({ transaction })
        await createLog(db, 'deleteStudio', studio.dataValues, transaction)
      })
    },

    createSeries: async (parent, data, { db }, info) =>
      db.transaction(async (transaction) => {
        const series = await db.models.series.create(data, { transaction })
        const { slug } = series.dataValues

        series.placeholder = data.cover
          ? await img(data.cover, 'series', slug)
          : undefined
        series.headerColor = data.cover
          ? await getImgColor(`series/${slug}`)
          : undefined
        await series.save({ transaction })

        await createLog(db, 'createSeries', data, transaction)
        return series
      }),
    updateSeries: async (parent, { slug, name, cover }, { db }, info) => {
      const series = await db.models.series.findByPk(slug)
      if (name) series.name = name
      if (cover) {
        series.placeholder = await img(cover, 'series', slug)
        series.headerColor = await getImgColor(`series/${slug}`)
      }

      return db.transaction(async (transaction) => {
        await series.save({ transaction })
        await createUpdateLog(db, 'updateSeries', series, transaction)
        return series
      })
    },
    deleteSeries: async (parent, { slug }, { db }) => {
      const series = await db.models.series.findByPk(slug)

      return db.transaction(async (transaction) => {
        await series.destroy({ transaction })
        await createLog(db, 'deleteSeries', series.dataValues, transaction)
      })
    },

    createGame: async (parent, data, { db }, info) => {
      const game = await db.models.game.create(data)

      return db.transaction(async (transaction) => {
        await Promise.all([
          game.setSeries(data.series, { transaction }),
          game.setPublishers(data.publishers, { transaction }),
          game.setPlatforms(data.platforms, { transaction })
        ])

        game.placeholder = data.cover
          ? await img(data.cover, 'game', data.slug)
          : ''
        game.headerColor = data.cover
          ? await getImgColor(`game/${data.slug}`)
          : undefined

        await game.save({ transaction })
        await createLog(db, 'createGame', data, transaction)

        return game
      })
    },
    updateGame: async (parent, args, { db }, info) => {
      const {
        slug,
        name,
        cover,
        releaseDate,
        series = [],
        publishers,
        platforms
      } = args
      const game = await db.models.game.findByPk(slug)

      game.name = name
      game.releaseDate = releaseDate

      if (cover) {
        game.placeholder = await img(cover, 'game', slug)
        series.headerColor = await getImgColor(`game/${slug}`)
      }

      // make more comprehensible log
      return db.transaction(async (transaction) => {
        game.setSeries(series, { transaction })
        game.setPublishers(publishers, { transaction })
        game.setPlatforms(platforms, { transaction })
        await game.save({ transaction })
        await createUpdateLog(db, 'updateGame', game, transaction)

        return game
      })
    },
    deleteGame: async (parent, { slug }, { db }) => {
      const game = await db.models.game.findByPk(slug)
      const log = {
        ...game.dataValues,
        series: await game.getSeries(),
        publishers: await game.getPublishers(),
        platforms: await game.getPlatforms()
      }

      return db.transaction(async (transaction) => {
        await game.destroy({ transaction })
        await createLog(db, 'deleteSeries', log, transaction)
      })
    },

    createAnimation: async (parent, data, { db }, info) => {
      return db.transaction(async (transaction) => {
        const anim = await db.models.animation.create(data, { transaction })
        await anim.setStudios(data.studios, { transaction })

        anim.placeholder = data.cover
          ? await img(data.cover, 'anim', anim.id)
          : ''
        anim.headerColor = data.cover
          ? await getImgColor(`anim/${anim.id}`)
          : undefined
        await anim.save({ transaction })

        await createLog(db, 'createAnimation', data, transaction)

        return anim
      })
    },
    updateAnimation: async (parent, data, { db }, info) => {
      const anim = await db.models.animation.findByPk(data.id)
      Object.entries(data).forEach(([key, value]) => {
        anim[key] = value
      })

      if (data.cover) {
        anim.placeholder = await img(data.cover, 'anim', anim.id)
        anim.headerColor = await getImgColor(`anim/${anim.id}`)
      }

      return db.transaction(async (transaction) => {
        anim.setStudios(data.studios, { transaction })

        await anim.save({ transaction })
        await createUpdateLog(db, 'updateAnimation', anim, transaction)
        return anim
      })
    },
    deleteAnimation: async (parent, { id }, { db }) => {
      const anim = await db.models.animation.findByPk(id)

      const log = {
        ...anim.dataValues,
        studios: await anim.getStudios()
      }

      return db.transaction(async (transaction) => {
        await anim.destroy({ transaction })
        await createLog(db, 'deleteAnim', log, transaction)
      })
    },

    updateAlbum: async (parent, data, { db }, info) => {
      try {
        const album = await db.models.album.findByPk(data.id)
        const triggerPost =
          data.status !== album.status.repeat(1) && data.status === 'show'
        data.artists = data.artists
          ? data.artists.map((artist) => {
              return { name: artist, slug: slugify(artist) }
            })
          : []

        await db.transaction(async (transaction) => {
          await db.models.artist.bulkCreate(data.artists, {
            ignoreDuplicates: true,
            transaction
          })

          // implement better log lol lmao

          await Promise.all([
            album.update(data, { transaction }),
            album.setArtists(
              data.artists.map(({ slug }) => slug),
              { transaction }
            ),
            album.setCategories(data.categories || [], { transaction }),
            album.setClassifications(data.classifications || [], {
              transaction
            }),
            album.setPlatforms(data.platforms || [], { transaction }),
            album.setGames(data.games || []),
            { transaction },
            album.setRelated(data.related || [], { transaction }),
            album.setAnimations(data.animations || [], { transaction }),
            db.models.disc
              .destroy({ where: { albumId: album.dataValues.id }, transaction })
              .then(() =>
                (data.discs || []).map((disc) =>
                  album.createDisc(disc, { transaction })
                )
              ),
            db.models.store
              .destroy({ where: { albumId: album.dataValues.id }, transaction })
              .then(() =>
                (data.stores || []).map((store) =>
                  album.createStore(store, { transaction })
                )
              ),
            db.models.download
              .destroy({ where: { albumId: album.dataValues.id }, transaction })
              .then(() =>
                (data.downloads || []).map((download) =>
                  album.createDownload(download, {
                    include: [db.models.link],
                    transaction
                  })
                )
              ),
            createUpdateLog(db, 'updateAlbum', album, transaction)
          ])

          if (data.cover) {
            album.placeholder = await img(data.cover, 'album', album.id)
            album.headerColor = await getImgColor(`album/${album.id}`)
            await album.save({ transaction })
          }
        })

        if (triggerPost) handleComplete(db, data, album)

        return album
      } catch (err) {
        console.log(err)
        throw new Error(err.message)
      }
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
