import 'dotenv/config'
import { defineConfig } from 'prisma/config'

const DATABASE_URL = `mysql://${process.env['DATABASE_USER']}:${process.env['DATABASE_PWD']}@${process.env['DATABASE_HOST']}:${process.env['DATABASE_PORT']}/${process.env['DATABASE_NAME']}`

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations'
  },
  datasource: {
    url: DATABASE_URL
  }
})
