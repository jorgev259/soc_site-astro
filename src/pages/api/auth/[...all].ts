import { authServer } from 'auth/auth-server'
import type { APIRoute } from 'astro'

export const ALL: APIRoute = async (ctx) => {
  return authServer.handler(ctx.request)
}
