import type { APIRoute } from 'astro'
import { authServer } from 'auth/auth-server'
import { signUpSchema } from 'schemas/user'
import { handleImg } from 'utils/img'
import prismaClient from 'utils/prisma-client'
import { getImgUrl } from 'utils/s3'

const DEFAULT_IMG = getImgUrl('user/clouds.png')

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData()
  const result = signUpSchema.safeParse(formData)

  if (!result.success) {
    return new Response(JSON.stringify({ message: result.error.message }), { status: 400 })
  }

  const { data } = result
  const { user } = await authServer.api.signUpEmail({
    body: { ...data, image: DEFAULT_IMG }
  })

  if (data.profilePic) {
    try {
      await handleImg(data.profilePic, 'img/user', user.name)
      await prismaClient.users.update({ where: { id: user.id }, data: { image: getImgUrl(`user/${user.name}.png`) } })
    } catch (err) {
      console.error(err)
    }
  }

  return new Response(
    JSON.stringify({
      message: 'Success!'
    }),
    { status: 200 }
  )
}
