import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema"

import { typeDefs } from "./__generated__/typeDefs.generated";
import { resolvers } from "./__generated__/resolvers.generated";

const schema = makeExecutableSchema({ typeDefs, resolvers })
export type ResolverContext = { request?: Request; /*session?: Session */ }

export async function getApolloClient(request?: Request) {
  // const session = request ? await getSession(request) : undefined

  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, context: { request } }),
    cache: new InMemoryCache()
  })
}