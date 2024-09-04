
import User from "@/sequelize/models/user";
import type { Session } from "@auth/core";

export async function getUser(session: Session | null) {
  if (!session) return null

  const { id } = session
  const user = await User.findByPk(id)
  return user
}