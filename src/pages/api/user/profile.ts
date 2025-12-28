import type { APIRoute } from 'astro'

import { editProfileSchema } from 'schemas/user'
import { handleImg } from 'utils/img'
import prismaClient from 'utils/prisma-client'
import { getImgUrl } from 'utils/s3'

export const PATCH: APIRoute = async ({ request }) => {
  const formData = await request.formData()
  const result = editProfileSchema.safeParse(formData)

  if (!result.success) {
    return new Response(JSON.stringify({ message: result.error.message }), { status: 400 })
  }

  const { data: body } = result
  const { userId, profilePic, ...data } = body
  let image

  const user = await prismaClient.users.findUniqueOrThrow({ where: { id: userId } })

  if (profilePic) {
    try {
      await handleImg(profilePic, 'img/user', user.name)
      image = getImgUrl(`user/${user.name}.png`)
    } catch (err) {
      console.error(err)
    }
  }

  await prismaClient.users.update({ where: { id: user.id }, data: { ...data, image } })

  return new Response(
    JSON.stringify({
      message: 'Success!'
    }),
    { status: 200 }
  )
}
