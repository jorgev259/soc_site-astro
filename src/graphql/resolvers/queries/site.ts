// import fg from 'fast-glob'
import type { Resolvers } from '@/graphql/__generated__/types.generated'
import { composeResolvers } from '@graphql-tools/resolvers-composition'

import Config from 'sequelize/models/config'

// import { hasRole } from 'server/utils/resolvers'

const resolversComposition = {
  /* 'Query.banners': hasRole('UPDATE') */
}
const resolvers: Resolvers = {
  Query: {
    config: async (_, args) => {
      const { name } = args
      const [result] = await Config.findOrCreate({ where: { name } })

      return result
    },

    /* highlight: async (parent, args, { db }) => {
      const { value } = await db.models.config.findByPk('highlight')
      return db.models.album.findByPk(value)
    }, 

      banners: async (parent, args) => {
      const filePaths = await fg(['/var/www/soc_img/img/live/**/ /**.png'])
const images = filePaths.map((f) => f.split('/').pop())

return images
}, 

recentComments: async (parent, { limit = 5 }, { db }) => {
return db.models.comment.findAll({
limit,
order: [['updatedAt', 'DESC']]
})
} */
  }
}

export default composeResolvers(resolvers, resolversComposition)
