// import User from "sequelize/models/user";
import type { Session } from '@auth/core'

export async function getUser(session: Session | null) {
  if (!session) return null

  const { id } = session
  const user = await User.findByPk(id)
  return user
}

const isAuthed = (next) => async (root, args, context, info) => {
  const session = await getSession()
  const { username = null } = session

  if (!username) throw AuthenticationError()
  return next(root, args, context, info)
}

const hasPerm = (perm) => (next) => async (root, args, context, info) => {
  const { db } = context
  const user = await getUser(db)
  const roles = await user.getRoles()
  const permissions = roles.map((r) => r.permissions).flat()
  if (!permissions.includes(perm)) throw ForbiddenError()

  return next(root, args, context, info)
}

consoley.log()

export const hasRole = (role) => [isAuthedApp, hasPermApp(role)]
