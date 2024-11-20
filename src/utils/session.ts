// Taken from https://lucia-auth.com
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding'
import { sha256 } from '@oslojs/crypto/sha2'
import { Argon2id } from 'oslo/password'
import type { AstroCookies } from 'astro'

import prismaClient from 'prisma/client'
import { type users, type session } from '@prisma/client'

export const argon2id = new Argon2id()
export const COOKIE_NAME = 'astro_soc'

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

export async function createSession(username: string, token: string): Promise<session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const session = await prismaClient.session.create({
    data: {
      id: sessionId,
      userId: username,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }
  })
  return session
}

const EMPTY_SESSION = { session: null, user: null }

export async function validateSessionToken(token?: string): Promise<SessionValidationResult> {
  if (!token) return EMPTY_SESSION

  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const result = await prismaClient.session.findUnique({
    where: {
      id: sessionId
    },
    include: {
      user: {
        select: {
          username: true,
          createdAt: true,
          placeholder: true,
          imgId: true
        }
      }
    }
  })

  if (result === null) return EMPTY_SESSION

  const { user, ...session } = result
  if (Date.now() >= session.expiresAt.getTime()) {
    await prismaClient.session.delete({ where: { id: sessionId } })
    return EMPTY_SESSION
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    await prismaClient.session.update({
      where: { id: session.id },
      data: { expiresAt: session.expiresAt }
    })
  }
  return { session, user }
}

export async function invalidateSession(sessionId: string): void {
  await prismaClient.session.delete({ where: { id: sessionId } })
}

export type SessionValidationResult = { session: session; user: users } | { session: null; user: null }

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: import.meta.env.PROD,
  path: '/'
}

export function setSessionTokenCookie(cookies: AstroCookies, token: string, expiresAt: Date) {
  cookies.set(COOKIE_NAME, token, { ...COOKIE_OPTIONS, expires: expiresAt })
}

export function deleteSessionTokenCookie(cookies: AstroCookies) {
  cookies.delete(COOKIE_NAME, { ...COOKIE_OPTIONS, maxAge: 0 })
}
