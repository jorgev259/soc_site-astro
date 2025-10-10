import type { APIRoute } from 'astro'
import * as s from 'superstruct'
import { decode } from 'decode-formdata'

import { hasPermission } from 'auth/auth-server'
import { handleImg } from 'utils/img'
import prismaClient from 'utils/prisma-client'
import { coerceBool, Status } from 'utils/form'

const uploadBannerSchema = s.object({
  set: s.defaulted(coerceBool, false),
  banner: s.instance(File)
})

const updateBannerSchema = s.object({ id: s.string() })

export const PUT: APIRoute = async ({ request, locals }) => {
  const { user } = locals
  const hasUpdate = await hasPermission(user?.id, { cms: ['update'] })
  if (!user || !hasUpdate) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = s.create(formData, uploadBannerSchema)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  const timestamp = Date.now().toString()
  await handleImg(body.banner, 'live', timestamp, false)
  if (body.set) {
    await prismaClient.config.upsert({
      where: { name: 'banner' },
      create: { name: 'banner', value: timestamp, createdAt: new Date(), updatedAt: new Date() },
      update: { value: timestamp }
    })
  }

  return Status(200, timestamp)
}

export const PATCH: APIRoute = async ({ request, locals }) => {
  const { user } = locals
  const hasUpdate = await hasPermission(user?.id, { cms: ['update'] })
  if (!user || !hasUpdate) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = s.create(formData, updateBannerSchema)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  const value = body.id
  await prismaClient.config.upsert({
    where: { name: 'banner' },
    create: { name: 'banner', value, createdAt: new Date(), updatedAt: new Date() },
    update: { value }
  })

  return Status(200)
}
