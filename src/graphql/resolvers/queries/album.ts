import { Op } from 'sequelize'

const resolvers = {
  Query: {
    artists: (parent, args, { db }, info) => db.models.artist.findAll(),
    platforms: (parent, args, { db }, info) => db.models.platform.findAll(),
    publishers: (parent, args, { db }, info) => db.models.publisher.findAll(),
    publisher: (parent, { id }, { db }, info) =>
      db.models.publisher.findByPk(id),
    categories: (parent, args, { db }, info) => db.models.category.findAll(),
    classifications: (parent, args, { db }, info) =>
      db.models.classification.findAll(),
    series: (parent, args, { db }, info) => db.models.series.findAll(),
    games: (parent, args, { db }, info) => db.models.game.findAll(),
    game: (parent, { slug }, { db }, info) => db.models.game.findByPk(slug),
    album: (_, { id }, { db }) => db.models.album.findByPk(id),
    downloads: (parent, { id }, { db }) =>
      db.models.download.findAll({ where: { albumId: id } }),
    albums: (_, __, { db }, info) =>
      db.models.album.findAll({
      }),

    platform: async (parent, { id }, { db }) => db.models.platform.findByPk(id),
    animation: (parent, { id }, { db }) => db.models.animation.findByPk(id),
    animations: (parent, args, { db }) => db.models.animation.findAll(),
    studio: (parent, { slug }, { db }) => db.models.studio.findByPk(slug),
    studios: (parent, { slug }, { db }) => db.models.studio.findAll(),
    seriesOne: (parent, { slug }, { db }, info) =>
      db.models.series.findByPk(slug),
    albumCount: async (parent, params, { db }) => db.models.album.count(),
    recentSeries: (parent, { limit }, { db }) =>
      db.models.series.findAll({
        limit,
        order: [['createdAt', 'DESC']]
      }),
    recentPublishers: (parent, { limit }, { db }) =>
      db.models.publisher.findAll({
        limit,
        order: [['createdAt', 'DESC']]
      }),
    recentPlatforms: (parent, { limit, type }, { db }) =>
      db.models.platform.findAll({
        limit,
        order: [['createdAt', 'DESC']],
        where: { type: { [Op.like]: `%${type}%` } }
      }),

    getRandomAlbum: async (parent, { limit = 1 }, { db }) => {
      const result = await db.models.album.findAll({
        order: db.random(),
        limit
      })
      return result
    }
  }
}

export default resolvers
