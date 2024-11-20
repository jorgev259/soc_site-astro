import fg from 'fast-glob'

import { composeResolvers } from '@graphql-tools/resolvers-composition'
import type { Resolvers } from '@/graphql/__generated__/types.generated'
import prismaClient from 'prisma/client'
import { checkPerm } from 'utils/resolvers'

const resolversComposition = {
  'Query.banners': checkPerm('UPDATE')
}

const resolvers: Resolvers = {
  Query: {
    config: (_, { name }, __, ___) =>
      prismaClient.config.upsert({
        where: { name },
        create: { name },
        update: {}
      }),
    banners: async (parent, args) => {
      const filePaths = await fg(['/var/www/soc_img/img/live/**/ /**.png'])
      const images = filePaths.map((f) => f.split('/').pop())

      return images
    },
    highlight: () => prismaClient.config.findUnique({ where: { name: 'highlight' } }),
    recentComments: async (parent, { limit: take = 5 }) =>
      prismaClient.comments.findMany({ take, orderBy: [{ updatedAt: 'desc' }] })
  }
}

export default composeResolvers(resolvers, resolversComposition)
