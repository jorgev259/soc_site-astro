import { createAuthClient } from 'better-auth/client'
import { usernameClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  plugins: [usernameClient()]
})
export const { useSession, signIn, signUp, signOut, forgetPassword, resetPassword } = authClient
