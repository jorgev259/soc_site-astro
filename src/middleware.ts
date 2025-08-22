import { authServer } from 'auth/auth-server'
import { defineMiddleware } from 'astro:middleware'
// import { paraglideMiddleware } from 'paraglide/server'

export const onRequest = defineMiddleware(async (context, next) => {
  const { request } = context
  //paraglideMiddleware(request, async ({ locale, request }) => {
  const isAuthed = await authServer.api.getSession({
    headers: request.headers
  })

  if (isAuthed) {
    context.locals.user = isAuthed.user
    context.locals.session = isAuthed.session
  } else {
    context.locals.user = null
    context.locals.session = null
  }

  return next()
  //})
})
