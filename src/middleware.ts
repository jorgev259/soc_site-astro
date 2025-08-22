import { auth } from 'auth'
import { defineMiddleware } from 'astro:middleware'
import { paraglideMiddleware } from 'paraglide/server'

import PAGES from 'utils/pages.json'
import prismaClient from 'utils/prisma-client'

export const onRequest = defineMiddleware(async (context, next) => {
  const { request } = context
  //paraglideMiddleware(request, async ({ locale, request }) => {
  const isAuthed = await auth.api.getSession({
    headers: request.headers
  })

  if (isAuthed) {
    context.locals.user = isAuthed.user
    context.locals.session = isAuthed.session

    const user = await prismaClient.users.findUnique({
      select: { roles: { select: { roleName: true, roles: { select: { permissions: true } } } } },
      where: { id: isAuthed.user.id }
    })
    const permissions = (user?.roles.map((r) => r.roles.permissions).flat() as string[]) ?? []
    const pages = PAGES.filter((p) => p.perms.some((r) => permissions.includes(r))).map((p) => p.url)

    context.locals.permissions = permissions
    context.locals.pages = pages
    context.locals.roles = user?.roles.map((r) => r.roleName) ?? []
  } else {
    context.locals.user = null
    context.locals.session = null
    context.locals.permissions = []
    context.locals.pages = []
  }

  return next()
  //})
})
