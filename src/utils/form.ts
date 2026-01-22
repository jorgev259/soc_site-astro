import slugify from 'slugify'
import { decode as decodeFD } from 'decode-formdata'
import { z } from 'astro/zod'

export const Status = (status: number, statusText?: string) => new Response(null, { status, statusText })
export const slug = (text: string) => slugify(text, { lower: true, strict: true })

export const decode = (formData: FormData) =>
  decodeFD(formData, {
    arrays: ['animations', 'classifications', 'categories', 'platforms', 'related', 'games', 'downloads', 'discs'],
    dates: ['releaseDate']
  })

export function getRandom<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export const coerceBool = z.coerce.boolean()
