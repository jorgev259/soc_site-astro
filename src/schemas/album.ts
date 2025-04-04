import * as s from 'superstruct'
import { AlbumStatus } from '@prisma/client'

const LinkInput = s.object({
  provider: s.string(),
  custom: s.optional(s.string()),
  url: s.optional(s.string()),
  url2: s.optional(s.string()),
  directUrl: s.optional(s.string())
})

export const DownloadInput = s.object({
  title: s.string(),
  links: s.defaulted(s.array(LinkInput), [])
})

export const CreateAlbum = s.object({
  cover: s.instance(File),
  title: s.optional(s.string()),
  subTitle: s.optional(s.string()),
  releaseDate: s.optional(s.string()),
  label: s.optional(s.string()),
  vgmdb: s.optional(s.string()),
  description: s.optional(s.string()),
  status: s.defaulted(s.enums(Object.values(AlbumStatus)), AlbumStatus.HIDDEN),
  animations: s.defaulted(s.array(s.integer()), []),
  artists: s.defaulted(s.array(s.string()), []),
  categories: s.defaulted(s.array(s.string()), []),
  classifications: s.defaulted(s.array(s.string()), []),
  games: s.defaulted(s.array(s.string()), []),
  platforms: s.defaulted(s.array(s.integer()), []),
  discs: s.defaulted(s.array(s.object({ number: s.integer(), body: s.string() })), []),
  downloads: s.defaulted(s.array(DownloadInput), []),
  related: s.defaulted(s.array(s.number()), []),
  stores: s.defaulted(s.array(s.object({ provider: s.string(), url: s.string() })), []),
  request: s.optional(s.integer())
})
