import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { SchemaLink } from '@apollo/client/link/schema'
import { getSession } from 'auth-astro/server'
import type { Session } from '@auth/core/types'
import prismaClient, { type users } from 'prisma/client'

import schema from './schema'

export type ResolverContext = { request?: Request; session?: Session; user?: users }

export async function getApolloClient(request?: Request) {
  const session = async () => (request ? getSession(request) : null)
  const user = async () => (session ? prismaClient.users.findUnique({ where: { username: session.id } }) : null)

  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, context: { request, session, user } }),
    cache: new InMemoryCache()
  })
}
