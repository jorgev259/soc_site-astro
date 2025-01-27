// @ts-check
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import node from '@astrojs/node'
import react from '@astrojs/react'
import paraglide from '@inlang/paraglide-astro'
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
    paraglide({ project: './project.inlang', outdir: './src/paraglide' }),
    icon({ iconDir: 'src/img/icons' }),
    react()
  ],
  output: 'server',
  adapter: node({ mode: 'standalone' })
})
