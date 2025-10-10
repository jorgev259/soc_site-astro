import slugify from 'slugify'
import { decode } from 'decode-formdata'
import * as s from 'superstruct'

export const Status = (status: number, statusText?: string) => new Response(null, { status, statusText })
export const slug = (text: string) => slugify(text, { lower: true, strict: true })

export function formToObject(formData: FormData) {
  const object: Record<string, any> = {}
  for (const entry of formData.entries()) {
    const [key, value] = entry
    object[key] = value
  }

  return object
}

export async function parseForm(formData: FormData) {
  const formObject = decode(formData, {
    arrays: ['animations', 'classifications', 'categories', 'platforms', 'related', 'games', 'downloads', 'discs'],
    dates: ['releaseDate']
  })

  return formObject
}

export function getRandom<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export const coerceBool = s.coerce(s.boolean(), s.string(), (value) => value === 'true' || value === 'on')
