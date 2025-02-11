import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { username } from 'better-auth/plugins'

import prismaClient from './utils/prisma-client'
import { sendEmail } from 'utils/email'
import forgorTemplate from 'utils/forgorTemplate'
import verifyTemplate from 'utils/verifyTemplate'

export const auth = betterAuth({
  database: prismaAdapter(prismaClient, { provider: 'mysql' }),
  user: { modelName: 'users' },
  plugins: [username()],
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      await sendEmail(user.email, 'Verify your email address', verifyTemplate.replaceAll('{{verify_link}}', url))
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail(user.email, 'Reset your password', forgorTemplate.replaceAll('{{forgor_link}}', url))
    }
  }
})
