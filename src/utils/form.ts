import slugify from 'slugify'

export const Status = (status: number, statusText?: string) => new Response(null, { status, statusText })
export const slug = (text: string) => slugify(text, { lower: true, strict: true })

export function formToObject(formData: FormData) {
  const object: Record<string, any> = {}
  formData.forEach((value, key) => {
    // Reflect.has in favor of: object.hasOwnProperty(key)
    if (!Reflect.has(object, key)) {
      object[key] = value
      return
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]]
    }
    object[key].push(value)
  })

  return object
}
