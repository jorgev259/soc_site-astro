/// <reference path="../.astro/types.d.ts" />
declare namespace App {
  // Note: 'import {} from ""' syntax does not work in .d.ts files.
  interface Locals {
    session: import('./src/utils/session').Session | null
    user: import('./src/utils/session').User | null
  }
}
