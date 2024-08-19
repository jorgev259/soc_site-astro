import { GraphQLUpload } from 'graphql-upload-minimal'

import {
  checkHeaderColor,
  solveRating,
  checkPlaceholder
} from '@/server/utils/resolvers'

import { getUser } from '@/next/utils/getSession'

const resolvers = {
  Upload: GraphQLUpload,
  Album: {
    artists: (parent, args, context, info) => parent.getArtists(),
    categories: (parent, args, context, info) => parent.getCategories(),
    classifications: (parent, args, context, info) =>
      parent.getClassifications(),
    platforms: (parent, args, context, info) =>
      parent.getPlatforms({ order: ['name'] }),
    games: (parent, args, context, info) => parent.getGames(),
    discs: (parent, args, context, info) =>
      parent.getDiscs({ order: [['number', 'ASC']] }),
    related: (parent, args, context, info) => parent.getRelated(),
    stores: (parent) => parent.getStores(),
    animations: (parent) => parent.getAnimations(),
    downloads: (parent) => parent.getDownloads(),
    comments: (parent) => parent.getComments(),
    isFavorite: async (album, _, { db }) => {
      const user = await getUser(db)
      return user ? album.hasUser(user.username) : null
    },
    selfComment: async (album, _, { db }) => {
      const user = await getUser(db)
      return user
        ? db.models.comment.findOne({
            where: { albumId: album.id, username: user.username }
          })
        : null
    },
    selfScore: async (album, _, { db }) => {
      const user = await getUser(db)
      return user
        ? (
            await db.models.rating.findOne({
              where: { albumId: album.id, username: user.username }
            })
          )?.score
        : null
    },
    favorites: (album, _, { db }) => album.countUsers(),
    placeholder: (album, _, { db }) => checkPlaceholder(album, 'album'),
    headerColor: (album, _, { db }) => checkHeaderColor(album, 'album'),
    avgRating: async (album, _, { db }) => solveRating(album)
  },

  Comment: {
    username: (parent) => (parent.anon ? null : parent.username),
    album: (comment, _, { db }) => comment.getAlbum()
  },

  Category: {
    albums: (parent) => parent.getAlbums(),
    count: (parent, args, { db }) =>
      db.models.album.count({
        include: [{ model: db.models.category, where: { name: parent.name } }]
      })
  },

  Download: {
    links: async (download) => {
      const links = await download.getLinks()
      const filterLinks = links.filter(
        (link) => !link.url.includes('adshrink.it')
      )
      const outLinks = filterLinks.length === 0 ? links : filterLinks

      // return outLinks.filter((link) => link.provider !== 'TERABOX')
      return outLinks
    }
  },

  Link: {
    url: async (link) => {
      const download = await link.getDownload()
      const links = await download.getLinks()

      return links.every((link) => link.url.includes('adshrink.it'))
        ? link.directUrl
        : link.url
    },

    directUrl: async (link, args, { db }) => {
      const download = await link.getDownload()
      const links = await download.getLinks()

      const fallback = links.every((link) => link.url.includes('adshrink.it'))
      if (fallback) return

      const user = await getUser(db)
      if (!user) return null

      const roles = await user.getRoles()
      const perms = roles.map((r) => r.permissions).flat()

      const donator = perms.includes('DIRECT')
      if (!donator) return null

      return link.directUrl
    }
  },

  Game: {
    albums: async (game, { order = [] }) => game.getAlbums({ order }),
    series: (parent, args, context, info) => parent.getSeries(),
    publishers: (parent, args, context, info) => parent.getPublishers(),
    platforms: (parent, args, context, info) =>
      parent.getPlatforms({ order: ['name'] }),
    placeholder: (game, _, { db }) => checkPlaceholder(game, 'game'),
    headerColor: (game, _, { db }) => checkHeaderColor(game, 'game')
  },

  Platform: {
    albums: (parent) => parent.getAlbums(),
    games: (platform, args, { db }) => platform.getGames()
  },

  Animation: {
    studios: (parent) => parent.getStudios(),
    albums: (anim, { order = [] }) => anim.getAlbums({ order }),
    placeholder: (anim, _, { db }) => checkPlaceholder(anim, 'anim'),
    headerColor: (anim, _, { db }) => checkPlaceholder(anim, 'anim')
  },

  Studio: {
    animations: (studio) => studio.getAnimations()
  },

  Series: {
    games: (parent, args, context, info) => parent.getGames(),
    placeholder: (series, _, { db }) => checkPlaceholder(series, 'series'),
    headerColor: (series, _, { db }) => checkPlaceholder(series, 'series')
  },

  Publisher: {
    games: (parent, args, context, info) => parent.getGames()
  },

  Disc: {
    album: (parent) => parent.getAlbum(),
    tracks: (parent) => parent.body.split(',')
  }
}

export default resolvers
