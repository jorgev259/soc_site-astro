import prismaClient from 'prisma/client'

import type { Resolvers } from '@/graphql/__generated__/types.generated'

const resolvers: Resolvers = {
  Query: {
    searchAlbum: async (_, args, context, info) => {
      const {
        title,
        categories,
        limit = 10,
        offset = 0,
        order = ['createdAt'],
        mode = 'DESC',
        status = ['show']
      } = args
      const fuzzyCondition = title
        ? {
            OR: [
              { title: { search: title.toLowerCase().split(' ').join(' & ') } },
              { subTitle: { search: title.toLowerCase().split(' ').join(' & ') } }
            ]
          }
        : {}

      const result = prismaClient.albums.findMany({
        take: limit,
        skip: offset,
        where: {
          AND: {
            ...fuzzyCondition,
            // category condition
            status: { in: status }
          }
        },
        include: { Album_Category: !!categories },
        orderBy: [...order.map((o) => ({ [o]: mode.toLowerCase() }))]
        // order: [literal("`album`.`status` = 'coming' DESC")]
      })

      return result
    }
    /* searchAlbumByArtist: async (parent, { name, categories, limit, page = 0, order = ['createdAt'], mode = 'DESC', status = ['show'] }, { db }) => {
      const include = [{ model: db.models.artist, where: { name: { [Op.like]: `%${name}%` } } }]

      if (categories) include.push({ model: db.models.class, where: { name: { [Op.in]: categories } } })

      return searchPage({ limit, page, model: 'album' }, {
        where: { status: { [Op.in]: status } },
        include,
        order: order.map(o => [o, mode])
      }, db)
    },
    searchAnimation: (parent, { title = '', limit, page = 0, order = 'createdAt', mode = 'DESC' }, { db }) => searchPage({ title, limit, page, model: 'animation' }, {
      where: { title: { [Op.like]: `%${title}%` } },
      order: [[order, mode]]
    }, db),
    searchStudio: (parent, { name = '', limit, page = 0, order = 'createdAt', mode = 'DESC' }, { db }) => searchPage({ name, limit, page, model: 'studio' }, {
      where: { name: { [Op.like]: `%${name}%` } },
      order: [[order, mode]]
    }, db),
    searchGame: (parent, { name = '', limit, page = 0, order = 'createdAt', mode = 'DESC' }, { db }) => searchPage({ name, limit, page, model: 'game' }, {
      where: { name: { [Op.like]: `%${name}%` } },
      order: [[order, mode]]
    }, db),
    searchSeries: (parent, { name = '', limit, page = 0, order = 'createdAt', mode = 'DESC' }, { db }) => searchPage({ name, limit, page, model: 'series' }, {
      where: { name: { [Op.like]: `%${name}%` } },
      order: [[order, mode]]
    }, db),
    searchSeriesByName: (parent, { name }, { db }) => db.models.series.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    }),
    searchPublishersByName: (parent, { name }, { db }) => db.models.publisher.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    }),
    searchPlatformsByName: (parent, { name, categories }, { db }) => db.models.platform.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        },
        type: { [Op.or]: categories }
      }
    }),
    searchPlatformsByCategories: (parent, { categories }, { db }) => categories.length === 0
      ? []
      : db.models.platform.findAll({ where: { type: { [Op.or]: categories } } }) */
  }
}

export default resolvers
