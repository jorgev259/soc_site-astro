// import mutations from './mutations'
import queries from './queries'
import types from './types'

const resolvers = { /*...mutations,*/ ...queries, ...types }

export default resolvers
