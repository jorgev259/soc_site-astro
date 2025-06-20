import { RequestState } from '@prisma/client'
import { object, string, number, optional, enums } from 'superstruct'

export const EditRequest = object({
  id: number(),
  title: optional(string()),
  link: optional(string()),
  state: enums(Object.values(RequestState)),
  reason: optional(string()),
  comments: optional(string()),
  message: optional(string())
})
