import slugify from 'slugify'
import { decode as decodeFD } from 'decode-formdata'
import { z } from 'astro/zod'

// A statusText must be single-line latin1 (Prisma errors contain "→" and newlines, which makes `new Response` throw),
// so the full message also goes in the body
const toStatusText = (text: string) =>
  text
    .replace(/\s+/g, ' ')
    .replace(/[^\x20-\x7E]/g, '?')
    .trim()
    .slice(0, 1000)
export const Status = (status: number, statusText?: string) =>
  new Response(statusText ?? null, { status, statusText: statusText ? toStatusText(statusText) : undefined })
export const slug = (text: string) => slugify(text, { lower: true, strict: true })

export const decode = (formData: FormData) =>
  decodeFD(formData, {
    arrays: [
      'animations',
      'classifications',
      'categories',
      'platforms',
      'related',
      'games',
      'downloads',
      'discs',
      'studios',
      'publishers',
      'series'
    ],
    dates: ['releaseDate']
  })

export function getRandom<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export const coerceBool = z.coerce.boolean()
