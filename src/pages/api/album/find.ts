import type { APIRoute } from 'astro'
import type { Prisma } from '@/prisma/client'
import prismaClient from 'utils/prisma-client'
import { slug } from 'utils/form'

export const GET: APIRoute = async (context) => {
  const { url } = context
  const titleParam = url.searchParams.get('q')
  const artistParam = url.searchParams.get('artist')?.trim()

  const where: Prisma.albumsWhereInput[] = []
  if (titleParam) where.push({ OR: [{ title: { contains: titleParam } }, { subTitle: { contains: titleParam } }] })
  // Albums credited to this artist, by name or slug
  if (artistParam) {
    where.push({ artists: { some: { OR: [{ artistSlug: slug(artistParam) }, { artist: { name: artistParam } }] } } })
  }

  const anims = await prismaClient.albums.findMany({
    where: where.length ? { AND: where } : undefined,
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
