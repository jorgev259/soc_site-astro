import { Role } from '@/prisma/enums'
import type { User } from 'auth/auth-server'

export const isDonator = (user: User) => user.role?.includes(Role.donator)
