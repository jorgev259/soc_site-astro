// @ts-check
import { defineConfig, envField } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import node from '@astrojs/node'
import react from '@astrojs/react'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import icon from 'astro-icon'

import { locales } from './project.inlang/settings.json'

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      MAILSERVER: envField.string({ context: 'server', access: 'secret', default: '{}' }),
      BETTER_AUTH_SECRET: envField.string({ context: 'server', access: 'secret', default: '' }),
      DATABASE_URL: envField.string({ context: 'server', access: 'secret', default: 'mysql://localhost:3306/default' }),
      BETTER_AUTH_URL: envField.string({ context: 'server', access: 'secret', default: 'http://localhost:4321' }),
      WEBHOOK_URL: envField.string({
        context: 'server',
        access: 'secret',
        default: 'https://discord.com/api/webhooks/1234567890'
      }),
      DISCORD_OAUTH_ID: envField.string({ context: 'server', access: 'secret', default: '' }),
      DISCORD_OAUTH_SECRET: envField.string({ context: 'server', access: 'secret', default: '' }),
      DISCORD_GUILD_ID: envField.string({ context: 'server', access: 'secret', default: '' }),
      DISCORD_DONATOR_ID: envField.string({ context: 'server', access: 'secret', default: '' }),
      IMG_PATH: envField.string({ context: 'server', access: 'secret', default: '/mnt/soc_img/img' })
    },
    validateSecrets: true
  },
  site: 'https://sittingonclouds.net',
  i18n: {
    locales,
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true
    }
  },
  integrations: [icon({ iconDir: 'src/img/icons' }), react()],
  vite: {
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide'
      })
    ]
  },
  image: { domains: ['cdn.sittingonclouds.net'] },
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  redirects: {
    '/en/[...params]': '/[...params]',
    '/profile': { status: 307, destination: '/maintenance' },
    '/profile/[username]': { status: 307, destination: '/maintenance' },
    '/request': { status: 308, destination: '/requests' }
  },
  security: {
    checkOrigin: false
  }
})
