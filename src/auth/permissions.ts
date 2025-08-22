import { createAccessControl } from 'better-auth/plugins/access'
import { adminAc, defaultStatements } from 'better-auth/plugins/admin/access'

const customStatements = { site: ['skip_ads'], cms: ['publish', 'update'], request: ['create'] }
const statement = { ...defaultStatements, ...customStatements } as const
export const ac = createAccessControl(statement)

export const roles = {
  admin: ac.newRole({ ...adminAc.statements, ...customStatements }),
  donator: ac.newRole({ site: ['skip_ads'] }),
  mod: ac.newRole({ cms: ['update'] })
} as const
