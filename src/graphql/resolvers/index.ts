import { mergeResolvers } from '@graphql-tools/merge'
import type { IResolvers } from '@graphql-tools/utils'

const imports: IResolvers[] = Object.values(import.meta.glob('./**/*.ts', { eager: true, import: 'default' }))
const resolvers = mergeResolvers(imports)

export default resolvers
