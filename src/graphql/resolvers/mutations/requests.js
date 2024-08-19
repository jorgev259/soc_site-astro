import { composeResolvers } from '@graphql-tools/resolvers-composition'
import { mergeResolvers } from '@graphql-tools/merge'

import { hasRole, isAuthedApp } from '@/server/utils/resolvers'
import { getUser } from '@/next/utils/getSession'
import { requestPOST } from '@/server/utils/requests'
import { UserInputError } from '@/next/server/utils/graphQLErrors'

const resolvers = {
  Mutation: {
    editRequest: async (parent, data, { db }, info) => {
      const request = await db.models.request.findByPk(data.id)
      if (!request) throw UserInputError('Request not found')

      await db.transaction(async (transaction) => {
        await request.set(data, { transaction })

        if (request.changed('state')) {
          switch (request.state) {
            case 'complete':
              await requestPOST('complete', { requestId: request.id })
              break

            case 'hold':
              await requestPOST('hold', {
                requestId: request.id,
                reason: data.reason
              })
              break
          }
        }

        await request.save({ transaction })
      })

      return request
    },

    rejectRequest: async (parent, data, { db }, info) => {
      const request = await db.models.request.findByPk(data.id)
      if (!request) throw UserInputError('Request not found')

      await requestPOST('reject', {
        requestId: request.id,
        reason: data.reason
      })
      return true
    }
  }
}

const submitActions = {
  Mutation: {
    submitAlbum: async (parent, data, { db }, info) => {
      const { request: requestId, title, vgmdb, links } = data
      let request

      if (requestId) {
        request = await db.models.request.findByPk(requestId)

        if (!request) throw UserInputError('Request not found')
        if (request.state === 'complete')
          throw UserInputError('Request already complete')
      }

      const user = await getUser(db)

      return db.models.submission.create({
        title,
        vgmdb,
        links,
        requestId,
        userUsername: user.username
      })
    }
  }
}

const requestResolvers = composeResolvers(resolvers, {
  'Mutation.*': hasRole('REQUESTS')
})
const submitResolvers = composeResolvers(submitActions, {
  'Mutation.*': [isAuthedApp]
})

export default mergeResolvers([requestResolvers, submitResolvers])
