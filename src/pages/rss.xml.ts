import rss, { type RSSFeedItem } from '@astrojs/rss';
import type { APIContext } from 'astro';
// @ts-ignore
import { Op } from 'sequelize'

import db from '@/sequelize';

export async function GET(context: APIContext) {
  const date = new Date()
  date.setDate(date.getDate() - 8)

  const isoDate = date.toISOString()
  const limitDate = `${isoDate.split('T')[0]}T00:00:00Z`
  const commonArgs = { include: [db.models.artist], order: [['createdAt', 'DESC']] }

  let albums = await db.models.album.findAll({ where: { createdAt: { [Op.gte]: limitDate } }, ...commonArgs })
  if (albums.length < 15) albums = await db.models.album.findAll({ limit: 15, ...commonArgs })

  const items: RSSFeedItem[] = albums.map((album: any) => {
    const { dataValues } = album
    const item: RSSFeedItem = {
      title: dataValues.title,
      pubDate: dataValues.createdAt,
      description: dataValues.subTitle || dataValues.artists.map((a: { name: string }) => a.name).join(' - '),
      link: `https://www.sittingonclouds.net/album/${dataValues.id}`,
      customData: `<media:content
          type="image/png"
          width="100"
          height="100"
          medium="image"
          url="https://cdn.sittingonclouds.net/album/${dataValues.id}.png" />
      `,
    }

    return item
  })

  return rss({
    xmlns: {
      media: "http://search.yahoo.com/mrss/",
    },
    stylesheet: '/rss/pretty-feed-v3.xsl',
    title: 'Sitting on Clouds',
    description: 'High Quality soundtrack library',
    site: context.site as unknown as string,
    trailingSlash: false,
    items,
  });
}