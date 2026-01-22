import { z } from 'astro/zod'
import { AlbumStatus } from '@/prisma/enums'
import { DownloadProvider } from 'utils/consts'

export const LinkInput = z.object({
  provider: z.enum(DownloadProvider),
  url: z.string().optional(),
  url2: z.string().optional(),
  directUrl: z.string().optional()
})

export const DownloadInput = z.object({
  title: z.string(),
  links: z.array(LinkInput).default([])
})

const coerceInt = z.coerce.number().int()
export const StoreInput = z.object({ provider: z.string(), url: z.string() })
export const DiscInput = z.object({ number: coerceInt, body: z.string() })

export const AlbumBase = z.object({
  cover: z.instanceof(File),
  title: z.string().optional(),
  subTitle: z.string().optional(),
  releaseDate: z.date().optional(),
  label: z.string().optional(),
  vgmdb: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(AlbumStatus).default(AlbumStatus.HIDDEN),
  animations: z.array(coerceInt).default([]),
  artists: z.string().optional().default(''),
  categories: z.array(z.string()).default([]),
  classifications: z.array(z.string()).default([]),
  games: z.array(z.string()).default([]),
  platforms: z.array(coerceInt).default([]),
  discs: z.array(DiscInput).default([]),
  downloads: z.array(DownloadInput).default([]),
  related: z.array(coerceInt).default([]),
  stores: z.array(StoreInput).default([]),
  request: coerceInt.optional()
})

export const EditAlbum = AlbumBase.partial().extend({ albumId: coerceInt })
