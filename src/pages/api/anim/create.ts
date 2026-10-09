import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import { Prisma } from '@/prisma/client'
import prismaClient from 'utils/prisma-client'

import { Status, decode, slug } from 'utils/form'
import { handleImg } from 'utils/img'
import { hasPermission } from 'auth/auth-server'

const CreateAnimation = z.object({
  cover: z.instanceof(File).optional(),
  title: z.string(),
  subTitle: z.string().optional(),
  releaseDate: z.coerce.date().optional(),
  headerColor: z.string().optional(),
  studios: z.array(z.string()).default([])
})

// Messages go in the body: multi-line text is not a valid statusText
const Text = (status: number, text: string) => new Response(text, { status })

export const POST: APIRoute = async ({ request, locals }) => {
  const { user } = locals
  const hasPublish = await hasPermission(user?.id, { cms: ['publish'] })
  if (!user || !hasPublish) return Status(403)

  let body
  try {
    const formData = decode(await request.formData())
    body = CreateAnimation.parse(formData)
  } catch (err) {
    return Text(422, (err as Error).message)
  }

  const studioRows = body.studios
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => ({ slug: slug(name), name }))

  try {
    const animation = await prismaClient.$transaction(
      async (tx) => {
        const animation = await tx.animation.create({
          data: {
            title: body.title,
            subTitle: body.subTitle || null,
            releaseDate: body.releaseDate ?? null,
            headerColor: body.headerColor || '#ffffff',
            studios: {
              create: studioRows.map((studio) => ({
                studio: { connectOrCreate: { create: studio, where: { slug: studio.slug } } }
              }))
            }
          }
        })

        if (body.cover) {
          const headerColor = await handleImg(body.cover, 'img/anim', animation.id)
          if (!body.headerColor) await tx.animation.update({ where: { id: animation.id }, data: { headerColor } })
        }

        return animation
      },
      { timeout: 30000 }
    )

    return Text(200, animation.id.toString())
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return Text(409, 'Animation with this title or subtitle already exists')
    }
    console.error(err)
    return Text(500, (err as Error).message)
  }
}
