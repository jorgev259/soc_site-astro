import type { APIRoute } from 'astro'
import * as s from 'superstruct'
import { decode } from 'decode-formdata'
import { Prisma } from '@prisma/client'
import prismaClient from 'utils/prisma-client'

import { Status, slug } from 'utils/form'
import { handleImg } from 'utils/img'

const Text = (status: number, text: string) => new Response(text, { status })

const AnimationBase = s.object({
  cover: s.instance(File),
  title: s.string(),
  subTitle: s.optional(s.string()),
  releaseDate: s.optional(s.date()),
  studios: s.defaulted(s.array(s.string()), [])
})

export const POST: APIRoute = async ({ request, locals }) => {
  const { permissions, user } = locals
  if (!user || !permissions.includes('CREATE')) return Status(403)

  let body
  try {
    const formData = decode(await request.formData(), { arrays: ['studios'], dates: ['releaseDate'], files: ['cover'] })
    body = s.create(formData, AnimationBase)
  } catch (err) {
    return Text(422, (err as Error).message)
  }

  try {
    const studioRows = body.studios
      .map((name) => name.trim())
      .filter(Boolean)
      .map((name) => ({ slug: slug(name), name }))

    const animRow = await prismaClient.$transaction(async (tx) => {
      const animRow = await tx.animation.create({
        data: {
          title: body.title,
          subTitle: body.subTitle || null,
          releaseDate: body.releaseDate ?? null,
          studios: {
            create: studioRows.map((studio) => ({
              studio: { connectOrCreate: { create: studio, where: { slug: studio.slug } } }
            }))
          }
        }
      })

      const headerColor = await handleImg(body.cover, 'anim', animRow.id)
      await tx.animation.update({ where: { id: animRow.id }, data: { headerColor } })

      return animRow
    }, { timeout: 30000 })

    return Text(200, animRow.id.toString())
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return Text(409, 'Animation with this title or subtitle already exists')
    }
    console.error(err)
    return Text(500, (err as Error).message)
  }
}
