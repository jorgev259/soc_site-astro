import type { ResolverContext } from '@/graphql/apolloClientSSR'
import { AuthenticationError, ForbiddenError } from './graphQLErrors'
import prismaClient from 'prisma/client'
import { COOKIE_NAME, validateSessionToken } from './session'

export const checkAuth = (next) => async (root, args, context: ResolverContext, info) => {
  const { user } = await validateSessionToken(context.cookies?.get(COOKIE_NAME)?.value)
  if (!user) throw AuthenticationError()

  return next(root, args, context, info)
}

export const checkPerm = (perm: string) => (next) => async (root, args, context: ResolverContext, info) => {
  const { user } = await validateSessionToken(context.cookies?.get(COOKIE_NAME)?.value)
  if (!user) throw AuthenticationError()

  const { roles } = await prismaClient.users.findUnique({
    where: { username: user?.username },
    include: { roles: { include: { role: { select: { permissions: true } } } } }
  })
  const perms = roles.map((r) => r.role.permissions).flat()

  if (!perms.includes(perm)) throw ForbiddenError()

  return next(root, args, context, info)
}
