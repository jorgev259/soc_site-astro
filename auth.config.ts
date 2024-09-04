import { CredentialsSignin } from '@auth/core/errors'
import { defineConfig } from 'auth-astro'
import Credentials from "@auth/core/providers/credentials"
import bcrypt from 'bcrypt'

import User from '@/sequelize/models/user'

declare module "@auth/core" {
  interface Session {
    id: string
    username: string
  }
}

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid username/email or password"
}

export default defineConfig({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) throw new InvalidLoginError()

        const user = await User.findByPk(credentials.username)
        if (!user) throw new InvalidLoginError()

        // @ts-ignore
        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) throw new InvalidLoginError()

        return { id: user.username, username: user.username }
      },
    }),
  ],
})