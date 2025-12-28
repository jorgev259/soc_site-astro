/// <reference types="vite-plugin-svgr/client" />
import type { ParaglideLocals } from '@inlang/paraglide-sveltekit'
import type { AvailableLanguageTag } from '$lib/paraglide/runtime'

declare global {
  namespace App {
    interface Locals {
      paraglide: ParaglideLocals<AvailableLanguageTag>
      user: import('./auth/auth-server').User | null
      session: import('better-auth').Session | null
    }
  }
}
