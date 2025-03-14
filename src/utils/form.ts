import slugify from 'slugify'

export const Status = (status: number, statusText?: string) => new Response(null, { status, statusText })
export const slug = (text: string) => slugify(text, { lower: true, strict: true })

function formToObject(formData: FormData) {
  const object: Record<string, any> = {}
  for (const entry of formData.entries()) {
    const [key, value] = entry
    object[key] = value
  }

  return object
}

export async function parseForm(request: Request) {
  const formData = await request.formData()
  const formObject = formToObject(formData)
  const { data: dataInput, ...rest } = formObject

  const data = JSON.parse(dataInput)
  return { ...data, ...rest }
}
