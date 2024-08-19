import getPuppeteer from 'vgmdb-parser/lib/puppeteer'

const resolvers = {
  Query: {
    vgmdb: (_, { url }) => getPuppeteer(url)
  }
}

export default resolvers
