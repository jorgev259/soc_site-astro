import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { SchemaLink } from '@apollo/client/link/schema'
import type { AstroCookies, AstroGlobal } from 'astro'

import schema from './schema'

export interface ResolverContext {
  cookies?: AstroCookies
}

export async function getApolloClient(cookies?: AstroCookies) {
  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, context: { cookies } }),
    cache: new InMemoryCache(),
    credentials: 'same-origin'
  })
}
