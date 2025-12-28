// @ts-check
import { defineConfig, envField } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import node from '@astrojs/node'
import react from '@astrojs/react'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import icon from 'astro-icon'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

import { locales } from './project.inlang/settings.json'

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
      S3_ROOT: envField.enum({
        context: 'server',
        access: 'secret',
        values: ['local', 'dev', 'prod'],
        default: 'local'
      }),
      S3_ID: envField.string({ context: 'server', access: 'secret', default: '' }),
      S3_SECRET: envField.string({ context: 'server', access: 'secret', default: '' })
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
  integrations: [icon({ iconDir: 'src/img/icons', svgoOptions: { plugins: ['collapseGroups'] } }), react()],
  vite: {
    plugins: [
      // @ts-expect-error
      tailwindcss(),
      // @ts-expect-error
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide'
      }),
      // @ts-expect-error
      tsconfigPaths(),
      // @ts-expect-error
      svgr({
        svgrOptions: {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx']
        }
      })
    ]
  },
  image: { domains: ['sittingonclouds.s3web.calibour.net'] },
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
