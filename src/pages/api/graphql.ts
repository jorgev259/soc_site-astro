import type { APIRoute } from 'astro'
import { createYoga } from 'graphql-yoga'

import schema from '@/graphql/schema'

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Request, Response }
})

export const POST: APIRoute = async (context) => {
  const { request } = context
  return handleRequest(request, context)
}
