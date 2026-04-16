import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import { CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { S3_BUCKET } from 'astro:env/server'

import { hasPermission } from 'auth/auth-server'
import { handleImg } from 'utils/img'
import { coerceBool, Status, decode } from 'utils/form'
import { s3Client } from 'utils/s3'

const uploadBannerSchema = z.object({
  set: coerceBool.default(false),
  banner: z.instanceof(File)
})

const updateBannerSchema = z.object({ id: z.string() })

async function setBanner(timestamp: string) {
  const deleteCommand = new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: 'img/live/banner.png' })
  const copyCommand = new CopyObjectCommand({
    Bucket: S3_BUCKET,
    CopySource: `${S3_BUCKET}/img/banner/${timestamp}.png`,
    Key: 'img/live/banner.png'
  })
  await s3Client.send(deleteCommand)
  await s3Client.send(copyCommand)
}

export const PUT: APIRoute = async ({ request, locals }) => {
  const { user } = locals
  const hasUpdate = await hasPermission(user?.id, { cms: ['update'] })
  if (!user || !hasUpdate) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = uploadBannerSchema.parse(formData)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  const timestamp = Date.now().toString()
  await handleImg(body.banner, 'img/banner', timestamp, false)
  if (body.set) await setBanner(timestamp)

  return Status(200, timestamp)
}

export const PATCH: APIRoute = async ({ request, locals }) => {
  const { user } = locals
  const hasUpdate = await hasPermission(user?.id, { cms: ['update'] })
  if (!user || !hasUpdate) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = updateBannerSchema.parse(formData)
  } catch (err) {
    return Status(422, (err as Error).message)
  }

  const value = body.id
  await setBanner(value)

  return Status(200)
}
