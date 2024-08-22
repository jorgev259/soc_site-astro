import type { ParaglideLocals } from "@inlang/paraglide-sveltekit"
import type { AvailableLanguageTag } from "$lib/paraglide/runtime"


declare global {
  namespace App {
    interface Locals {
      paraglide: ParaglideLocals<AvailableLanguageTag>
    }
  }
}