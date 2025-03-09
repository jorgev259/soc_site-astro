import * as s from 'superstruct'

const LinkInput = s.object({
  provider: s.string(),
  custom: s.optional(s.string()),
  url: s.optional(s.string()),
  url2: s.optional(s.string()),
  directUrl: s.optional(s.string())
})

export const DownloadInput = s.object({
  title: s.string(),
  small: s.defaulted(s.boolean(), false),
  links: s.defaulted(s.array(LinkInput), [])
})
