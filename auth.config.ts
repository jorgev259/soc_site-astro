import { CredentialsSignin } from '@auth/core/errors'
import { defineConfig } from 'auth-astro'
import Credentials from '@auth/core/providers/credentials'
import bcrypt from 'bcrypt'
import prismaClient from 'prisma/client'

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid username/email or password'
}

export default defineConfig({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', required: true },
        password: { label: 'Password', type: 'password', required: true }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) throw new InvalidLoginError()

        const user = await prismaClient.users.findUnique({ where: { username: credentials.username } })
        if (!user) throw new InvalidLoginError()

        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) throw new InvalidLoginError()

        return { id: user.username }
      }
    })
  ]
})
