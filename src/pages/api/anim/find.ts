import type { APIRoute } from 'astro'
import prismaClient from 'utils/prisma-client'

export const GET: APIRoute = async (context) => {
  const { url } = context
  const titleParam = url.searchParams.get('q')

  const anims = await prismaClient.animation.findMany({
    where: titleParam ? { title: { contains: titleParam } } : undefined,
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
