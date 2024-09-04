import ApolloPackage from '@apollo/client'
const { ApolloClient, InMemoryCache } = ApolloPackage;
import { SchemaLink } from "@apollo/client/link/schema"
import { makeExecutableSchema } from "@graphql-tools/schema";
import { getSession } from 'auth-astro/server';
import type { Session } from '@auth/core/types';

import { typeDefs } from "./__generated__/typeDefs.generated";
import resolvers from '@/graphql/resolvers'

import db from '@/sequelize';

const schema = makeExecutableSchema({ typeDefs, resolvers })
export type ResolverContext = { request?: Request, session?: Session }

export async function getApolloClient(request?: Request) {
  const session = request ? await getSession(request) : null

  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, context: { request, session, db } }),
    cache: new InMemoryCache()
  })
}