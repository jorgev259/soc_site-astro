import { composeResolvers } from '@graphql-tools/resolvers-composition'
import fs from 'fs-extra'
import path from 'path'

import { img } from '@/server/utils/image'
import { hasRole } from '@/server/utils/resolvers'
import { UserInputError } from '@/next/server/utils/graphQLErrors'

const resolversComposition = { 'Mutation.*': hasRole('UPDATE') }
const resolvers = {
  Mutation: {
    config: async (parent, data, { db, payload }, info) =>
      db.models.config
        .upsert(data)
        .then(() => db.models.config.findByPk(data.name)),

    uploadBanner: async (parent, { banner }, { db, payload }) => {
      const timestamp = Date.now()
      await img(banner, 'live', timestamp)
      await db.models.config.upsert({ name: 'banner', value: timestamp })

      return 1
    },

    selectBanner: async (parent, { name }, { db }) => {
      const filePath = path.join('/var/www/soc_img/img/live', `${name}.png`)
      if (!(await fs.pathExists(filePath)))
        throw UserInputError(`Banner '${name}' doesnt exist`)

      await db.models.config.upsert({ name: 'banner', value: name })

      return 1
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
