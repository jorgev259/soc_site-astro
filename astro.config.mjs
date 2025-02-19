// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
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
    paraglide({ project: './project.inlang', outdir: './src/paraglide' }),
    icon({ iconDir: 'src/img/icons' }),
    react()
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  image: { domains: ['cdn.sittingonclouds.net'] },
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  redirects: {
    '/album/list': { status: 307, destination: '/maintenance' },
    '/last-added': { status: 307, destination: '/maintenance' },
    '/anim': { status: 307, destination: '/maintenance' },
    '/anim/[id]': { status: 307, destination: '/maintenance' },
    '/anim/list': { status: 307, destination: '/maintenance' },
    '/game': { status: 307, destination: '/maintenance' },
    '/game/[slug]': { status: 307, destination: '/maintenance' },
    '/game/list': { status: 307, destination: '/maintenance' },
    '/platform/list': { status: 307, destination: '/maintenance' },
    '/platform/[id]': { status: 307, destination: '/maintenance' },
    '/profile/[username]': { status: 307, destination: '/maintenance' },
    '/series/[slug]': { status: 307, destination: '/maintenance' },
    '/series/list': { status: 307, destination: '/maintenance' },
    '/studio/[slug]': { status: 307, destination: '/maintenance' },
    '/studio/list': { status: 307, destination: '/maintenance' },
    '/forgor': { status: 307, destination: '/maintenance' },
    '/holy12': { status: 307, destination: '/maintenance' },
    '/request': { status: 307, destination: '/maintenance' },
    '/search': { status: 307, destination: '/maintenance' }
  }
})
