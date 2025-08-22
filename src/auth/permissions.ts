import { createAccessControl } from 'better-auth/plugins/access'
import { defaultStatements } from 'better-auth/plugins/admin/access'

const statement = {
  ...defaultStatements,
  site: ['skip_ads'],
  cms: ['publish', 'update'],
  request: ['create']
} as const
export const ac = createAccessControl(statement)

export const roles = { donator: ac.newRole({ site: ['skip_ads'] }), mod: ac.newRole({ cms: ['update'] }) } as const
