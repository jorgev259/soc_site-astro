import { createAuthClient } from 'better-auth/client'
import { usernameClient } from 'better-auth/client/plugins'
import { adminClient } from 'better-auth/client/plugins'

import { ac, roles } from './permissions'

export const authClient = createAuthClient({
  plugins: [usernameClient(), adminClient({ ac, roles })]
})
export const { useSession, signIn, signUp, signOut, requestPasswordReset, resetPassword, linkSocial } = authClient
