import { auth } from 'auth'
import { defineMiddleware } from 'astro:middleware'

import PAGES from 'utils/pages.json'
import prismaClient from 'utils/prisma-client'

export const onRequest = defineMiddleware(async (context, next) => {
  const isAuthed = await auth.api.getSession({
    headers: context.request.headers
  })

  if (isAuthed) {
    context.locals.user = isAuthed.user
    context.locals.session = isAuthed.session

    const user = await prismaClient.users.findUnique({
      select: { roleList: { select: { roles: { select: { permissions: true } } } } },
      where: { id: isAuthed.user.id }
    })
    const permissions = (user?.roleList.map((r) => r.roles.permissions).flat() as string[]) ?? []
    const pages = PAGES.filter((p) => p.perms.some((r) => permissions.includes(r))).map((p) => p.url)

    context.locals.permissions = permissions
    context.locals.pages = pages
  } else {
    context.locals.user = null
    context.locals.session = null
    context.locals.permissions = []
    context.locals.pages = []
  }

  return next()
})
