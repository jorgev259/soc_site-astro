import rss, { type RSSFeedItem } from '@astrojs/rss'
import type { APIContext } from 'astro'
import prismaClient from 'utils/prisma-client'

export async function GET(context: APIContext) {
  const albums = await prismaClient.albums.findMany({
    where: { status: 'show' },
    include: { artistList: { include: { artist: { select: { name: true } } } } },
    take: 15,
    orderBy: { createdAt: 'desc' }
  })

  const items: RSSFeedItem[] = albums.map((album) => ({
    guid: `album/${album.id}`,
    title: album.title || 'Error: Missing title',
    pubDate: new Date(album.createdAt || ''),
    description: album.subTitle || album.artistList.map((a) => a.artist.name).join(' - '),
    link: `https://www.sittingonclouds.net/album/${album.id}`,
    customData: `<media:content
          type="image/png"
          width="100"
          height="100"
          medium="image"
          url="https://cdn.sittingonclouds.net/album/${album.id}.png" />
      `
  }))

  return rss({
    xmlns: {
      media: 'http://search.yahoo.com/mrss/'
    },
    stylesheet: '/rss/pretty-feed-v3.xsl',
    title: 'Sitting on Clouds',
    description: 'High Quality soundtrack library',
    site: context.site as unknown as string,
    trailingSlash: false,
    items
  })
}
