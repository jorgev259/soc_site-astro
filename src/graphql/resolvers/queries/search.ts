//@ts-ignore
import { Op, literal } from 'sequelize'
import type { Resolvers } from '@/graphql/__generated__/types.generated'



const fuzzySearch = (words: string[]) => `^${words.map(w => `(?=.*\b${w}\b)`)}.+/i`

const resolvers: Resolvers = {
  Query: {
    searchAlbum: (_, args, { db }) => {
      const { title, categories, limit = 10, offset = 0, order = ['createdAt'], mode = 'DESC', status = ['show'] } = args
      const fuzzyCondition = title ? {
        [Op.or]: [
          { title: { [Op.regexp]: fuzzySearch(title.split(' ')) } },
          { subTitle: { [Op.regexp]: fuzzySearch(title.split(' ')) } }
        ]
      } : {}

      const include = []
      if (categories) include.push({ model: db.models.category, where: { name: { [Op.in]: categories } } })

      return db.models.album.findAndCountAll({
        limit, offset,
        where: {
          ...fuzzyCondition,
          status: { [Op.in]: status }
        },
        include,
        order: [literal('`album`.`status` = \'coming\' DESC'), ...order.map(o => [o, mode])]
      })
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
