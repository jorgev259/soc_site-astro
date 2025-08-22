import type { APIRoute } from 'astro'

import { Status } from 'utils/form'
import { checkLockChannel } from 'integrations/requestCat'

export const POST: APIRoute = async ({ request, locals }) => {
  const { permissions, user } = locals
  if (!user || !permissions.includes('REQUESTS')) return Status(403)

  await checkLockChannel().catch((err) => {
    console.error(err)
    return Status(500, (err as Error).message)
  })

  return Status(200)
}
