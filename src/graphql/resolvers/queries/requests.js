import { Op, fn, col, where } from 'sequelize'

const resolvers = {
  Query: {
    requests: (_, {
      state = ['complete', 'hold', 'pending'],
      donator = [true, false]
    }, { db }) => db.models.request.findAll({ where: { state, donator } }),
    request: (_, { link }, { db }) => db.models.request.findOne({ where: { link } }),

    searchRequests: async (_, {
      state = ['complete', 'hold', 'pending'],
      donator = [true, false],
      limit = 10,
      page = 0,
      filter
    }, { db }) => {
      const options = { limit, offset: limit * page }
      const optionsWhere = { state, donator }

      async function exactSearch () {
        if (!filter) return

        const results = await db.models.request.findAndCountAll({
          where: {
            ...optionsWhere,
            [Op.or]: [
              { id: filter },
              { link: filter },
              { user: filter },
              { userID: filter }
            ]
          },
          ...options
        })

        if (results.rows.length > 0) return results
      }

      function looseSearch () {
        return db.models.request.findAndCountAll({
          where: [
            optionsWhere,
            where(fn('LOWER', col('title')), { [Op.like]: `%${filter || ''}%` })
          ],
          ...options
        })
      }

      return await exactSearch() || looseSearch()
    },

    submissions: (_, args, context) => {
      const { filter = '', state = ['pending'] } = args
      const { db } = context

      return db.models.submission.findAll({
        where: {
          [Op.and]: [
            { state: { [Op.in]: state } },
            {
              [Op.or]: [
                { id: filter },
                { vgmdb: filter },
                { userUsername: filter },
                where(fn('LOWER', col('title')), { [Op.like]: `%${filter.toLowerCase()}%` })
              ]
            }
          ]
        }
      })
    }
  }
}

export default resolvers
