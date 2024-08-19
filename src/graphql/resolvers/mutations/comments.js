import { composeResolvers } from '@graphql-tools/resolvers-composition'
// import axios from 'axios'

import { isAuthedApp } from '@/server/utils/resolvers'
import { getSession, getUser } from '@/next/utils/getSession'

// const token = process.env.IRONCLAD

const resolversComposition = {
  'Mutation.*': [isAuthedApp]
}

const resolvers = {
  Mutation: {
    updateComment: async (_, { text, anon, albumId }, { db }) => {
      const { username } = await getSession()
      const row = await db.models.comment.findOne({
        where: { albumId, username }
      })

      if (row) {
        await row.update({ text, anon })
        await row.save()
      } else await db.models.comment.create({ albumId, username, text, anon })

      return true
    },
    addFavorite: async (_, { albumId }, { db }) => {
      const user = await getUser(db)
      await user.addAlbum(albumId)
      return true
    },
    removeFavorite: async (_, { albumId }, { db }) => {
      const user = await getUser(db)
      await user.removeAlbum(albumId)
      return true
    },
    rateAlbum: async (_, { albumId, score }, { db }) => {
      const { username } = await getSession()
      const row = await db.models.rating.findOne({
        where: { albumId, username }
      })

      if (row) {
        await row.update({ score })
        await row.save()
      } else await db.models.rating.create({ albumId, username, score })

      return true
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
