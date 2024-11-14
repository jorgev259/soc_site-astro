import rss, { type RSSFeedItem } from '@astrojs/rss'
import type { APIContext } from 'astro'

import { getApolloClient } from '@/graphql/apolloClient.js'
import { gql } from '@/graphql/__generated__/client'

const addedQuery = gql(`
  query LastAdded ($limit: Int) {
    added: searchAlbum(limit: $limit, status: ["show"]) {
        id
        createdAt
        title
        subTitle
        artists {
          name
        }
    }
  }
`)

export async function GET(context: APIContext) {
  const client = await getApolloClient()
  const { data } = await client.query({ query: addedQuery, variables: { limit: 15 } })
  const { added } = data

  const items: RSSFeedItem[] = added.map((album) => ({
    guid: `album/${album?.id}`,
    title: album?.title,
    pubDate: new Date(album?.createdAt || ''),
    description: album?.subTitle || album?.artists.map((a) => a?.name).join(' - '),
    link: `https://www.sittingonclouds.net/album/${album?.id}`,
    customData: `<media:content
          type="image/png"
          width="100"
          height="100"
          medium="image"
          url="https://cdn.sittingonclouds.net/album/${album?.id}.png" />
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
