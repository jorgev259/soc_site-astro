import { defineMiddleware } from 'astro:middleware'
import { setSessionTokenCookie, deleteSessionTokenCookie, validateSessionToken, COOKIE_NAME } from 'utils/session'

export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get(COOKIE_NAME)?.value
  if (!token) {
    context.locals.user = null
    context.locals.session = null
    return next()
  }

  const { session, user } = await validateSessionToken(token)
  if (session !== null) {
    setSessionTokenCookie(context.cookies, token, session.expiresAt)
  } else {
    deleteSessionTokenCookie(context.cookies)
  }

  context.locals.session = session
  context.locals.user = user
  return next()
})
