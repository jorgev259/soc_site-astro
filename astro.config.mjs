import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import node from '@astrojs/node'
import paraglide from '@inlang/paraglide-astro'
import auth from 'auth-astro'
import icon from 'astro-icon'

import { languageTags } from './project.inlang/settings.json'

// https://astro.build/config
export default defineConfig({
  site: 'https://beta.sittingonclouds.net',
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
    }),
    icon({ iconDir: 'src/img/icons' })
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  image: {
    domains: ['cdn.sittingonclouds.net']
  }
})
