import { betterAuth } from 'better-auth/minimal'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { username, bearer, admin } from 'better-auth/plugins'
import type { Statements } from 'better-auth/plugins/access'
import { DISCORD_OAUTH_ID, DISCORD_OAUTH_SECRET } from 'astro:env/server'
import { Role } from '@/prisma/enums'

import prismaClient from '../utils/prisma-client'
import { sendEmail } from '../utils/email'
import forgorTemplate from '../utils/forgorTemplate'
import verifyTemplate from '../utils/verifyTemplate'
import { ac, roles } from 'auth/permissions'

export const authServer = betterAuth({
  trustedOrigins: ['https://sittingonclouds.net', 'https://www.sittingonclouds.net'],
  database: prismaAdapter(prismaClient, { provider: 'mysql' }),
  user: { modelName: 'users' },
  plugins: [username(), bearer(), admin({ defaultRole: Role.user, adminRoles: Role.admin, ac, roles })],
  account: {
    accountLinking: {
      enabled: true,
      allowDifferentEmails: true
    }
  },
  socialProviders: {
    discord: {
      clientId: DISCORD_OAUTH_ID,
      clientSecret: DISCORD_OAUTH_SECRET,
      scope: ['identify', 'email', 'guilds.members.read']
    }
  },
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

export async function hasPermission(userId: string | undefined, permissions: Statements) {
  if (!userId) return false

  const res = await authServer.api.userHasPermission({ body: { userId, permissions } })
  return res.success
}
