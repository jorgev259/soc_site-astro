import type { APIRoute } from 'astro'
import prismaClient from 'utils/prisma-client'

export const GET: APIRoute = async (context) => {
  const { url } = context
  const titleParam = url.searchParams.get('q')

  const anims = await prismaClient.albums.findMany({
    where: titleParam
      ? { OR: [{ title: { contains: titleParam } }, { subTitle: { contains: titleParam } }] }
      : undefined,
    select: { id: true, title: true },
    take: 10,
    orderBy: { createdAt: 'desc' }
  })

  return new Response(JSON.stringify(anims), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
