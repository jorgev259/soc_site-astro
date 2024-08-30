import ApolloPackage from '@apollo/client'
const { ApolloClient, InMemoryCache } = ApolloPackage;
import { SchemaLink } from "@apollo/client/link/schema"
import { makeExecutableSchema } from "@graphql-tools/schema";
import { getSession } from 'auth-astro/server';
import type { Session } from '@auth/core/types';
import { typeDefs } from "./__generated__/typeDefs.generated";
import resolvers from '@/graphql/resolvers'
import type { MySqlDialect } from '@sequelize/mysql';
import { Sequelize, type ModelStatic, type Options } from '@sequelize/core'

const schema = makeExecutableSchema({ typeDefs, resolvers })
export type ResolverContext = { request?: Request, session?: Session }

const envOptions: Options<MySqlDialect> = JSON.parse(import.meta.env.SEQUELIZE) || {}

export async function getApolloClient(request?: Request) {
  const session = request ? await getSession(request) : null
  const db = new Sequelize(envOptions)
  envOptions.models = Object.values<ModelStatic>(await import.meta.glob('@/sequelize/models/**/*.ts', { eager: true, import: 'default' }))

  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, context: { request, session } }),
    cache: new InMemoryCache()
  })
}