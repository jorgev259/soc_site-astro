import type { Prisma } from '@/prisma/client'

export type AlbumSort = 'title' | 'releaseDate'

// Reads the ?group= and ?sort= filters of a game or anime page
export function getAlbumFilters(url: URL) {
  const group = url.searchParams.get('group')
  const sort: AlbumSort = url.searchParams.get('sort') === 'releaseDate' ? 'releaseDate' : 'title'

  // Newest first, with albums released on the same day sorted by title
  const orderBy: { album: Prisma.albumsOrderByWithRelationInput }[] =
    sort === 'releaseDate'
      ? [{ album: { releaseDate: 'desc' } }, { album: { title: 'asc' } }]
      : [{ album: { title: 'asc' } }]

  return { group, sort, orderBy }
}

// The groups these albums are in, sorted so "Season 2" comes before "Season 10"
export function getGroups(albums: { groupName: string | null }[]) {
  const names = albums.map((album) => album.groupName).filter((name): name is string => !!name)
  return [...new Set(names)].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
}

// Link to the same page with other filters, leaving the defaults out of the url
export function getFiltersHref(pathname: string, group: string | null, sort: AlbumSort) {
  const params = new URLSearchParams()
  if (group) params.set('group', group)
  if (sort !== 'title') params.set('sort', sort)

  const query = params.toString()
  return query ? `${pathname}?${query}` : pathname
}
