import * as s from 'superstruct'
import { AlbumStatus } from '@prisma/client'
import { DownloadProvider } from 'utils/consts'

export const LinkInput = s.object({
  provider: s.enums(Object.values(DownloadProvider)),
  url: s.optional(s.string()),
  url2: s.optional(s.string()),
  directUrl: s.optional(s.string())
})

export const DownloadInput = s.object({
  title: s.string(),
  links: s.defaulted(s.array(LinkInput), [])
})

const coerceInt = s.coerce(s.integer(), s.string(), (value) => parseInt(value))
export const StoreInput = s.object({ provider: s.string(), url: s.string() })
export const DiscInput = s.object({ number: coerceInt, body: s.string() })

export const AlbumBase = s.object({
  cover: s.instance(File),
  title: s.optional(s.string()),
  subTitle: s.optional(s.string()),
  releaseDate: s.optional(s.date()),
  label: s.optional(s.string()),
  vgmdb: s.optional(s.string()),
  description: s.optional(s.string()),
  status: s.defaulted(s.enums(Object.values(AlbumStatus)), AlbumStatus.HIDDEN),
  animations: s.defaulted(s.array(coerceInt), []),
  artists: s.defaulted(s.array(s.string()), []),
  categories: s.defaulted(s.array(s.string()), []),
  classifications: s.defaulted(s.array(s.string()), []),
  games: s.defaulted(s.array(s.string()), []),
  platforms: s.defaulted(s.array(coerceInt), []),
  discs: s.defaulted(s.array(DiscInput), []),
  downloads: s.defaulted(s.array(DownloadInput), []),
  related: s.defaulted(s.array(coerceInt), []),
  stores: s.defaulted(s.array(StoreInput), []),
  request: s.optional(coerceInt)
})

export const EditAlbum = s.assign(
  s.partial(AlbumBase),
  s.object({ albumId: coerceInt, artists: s.optional(s.string()) })
)
