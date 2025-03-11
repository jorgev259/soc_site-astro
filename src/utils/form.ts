import slugify from 'slugify'

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
