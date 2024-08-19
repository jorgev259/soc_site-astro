import ApolloPackage from '@apollo/client'
const { ApolloClient, InMemoryCache } = ApolloPackage;
import { SchemaLink } from "@apollo/client/link/schema"
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers } from '@graphql-tools/merge'
import path from "node:path"

import { typeDefs } from "./__generated__/typeDefs.generated";
// import { resolvers } from "./__generated__/resolvers.generated";
import db from "@/sequelize";
import resolverArray from '@/graphql/resolvers'

export const resolvers = mergeResolvers(resolverArray)

const schema = makeExecutableSchema({ typeDefs, resolvers })
export type ResolverContext = { request?: Request, db: any /*session?: Session */ }

export async function getApolloClient(request?: Request) {
  // const session = request ? await getSession(request) : undefined

  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, context: { request, db } }),
    cache: new InMemoryCache()
  })
}