// import type { Resolvers } from '@/graphql/__generated__/types.generated'

const userResolvable = {
  /* roles: parent => parent.getRoles(),
  permissions: async parent => {
    const roles = await parent.getRoles()
    return roles.map(r => r.permissions).flat()
  }, */
  pages: async (_, __, { session }) => {
    const roles = await parent.getRoles()
    const permissions = roles.map((r) => r.permissions).flat()

    return pages.filter(
      ({ perms }) =>
        perms.length === 0 || perms.some((r) => permissions.includes(r))
    )
  }
  /*  comments: (user, _, { db }) => user.getComments({ where: { albumId: { [Op.not]: null } } }),
   favorites: user => user.getAlbums(),
   imgUrl: async user => `https://cdn.sittingonclouds.net/user/${user.imgId ? `${user.username}_${user.imgId}` : 'default'
     }.png` */
}

const resolvers = {
  // User: userResolvable,
  UserMe: {
    pages: async (_, __, { session }) => {
      const roles = await parent.getRoles()
      const permissions = roles.map((r) => r.permissions).flat()

      return pages.filter(
        ({ perms }) =>
          perms.length === 0 || perms.some((r) => permissions.includes(r))
      )
    }
  }
  /*Role: { permissions: parent => typeof parent.permissions === 'string' || parent.permissions instanceof String ? JSON.parse(parent.permissions) : parent.permissions },
  Submission: {
    submitter: submission => submission.getUser(),
    links: async (submission, _, { db }) => {
      const user = await getUser(db)
      if (!user) return null

      const roles = await user.getRoles()
      const perms = roles.map(r => r.permissions).flat()

      if (!perms.includes('REQUESTS')) return null

      return submission.links
    },
    request: submission => submission.getRequest()
  }*/
}

export default resolvers
