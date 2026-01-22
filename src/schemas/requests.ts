import { RequestState } from '@/prisma/enums'
import { z } from 'astro/zod'

export const EditRequest = z.object({
  id: z.number(),
  title: z.string().optional(),
  link: z.string().optional(),
  state: z.enum(RequestState),
  reason: z.string().optional(),
  comments: z.string().optional(),
  message: z.string().optional()
})

