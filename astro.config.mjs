import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import node from '@astrojs/node'
import paraglide from '@inlang/paraglide-astro'
import auth from 'auth-astro'

import { languageTags } from './project.inlang/settings.json'

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: languageTags,
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true
    }
  },
  integrations: [
    tailwind(),
    auth(),
    paraglide({
      // recommended settings
      project: './project.inlang',
      outdir: './src/paraglide' //where your files should be
    })
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
})
