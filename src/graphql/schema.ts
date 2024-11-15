import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from '@/graphql/__generated__/typeDefs.generated'
import resolvers from '@/graphql/resolvers'

const schema = makeExecutableSchema({ typeDefs, resolvers })
export default schema
