// @ts-check
import { defineConfig, envField } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import node from '@astrojs/node'
import react from '@astrojs/react'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import icon from 'astro-icon'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { loadEnv } from 'vite'

import { locales } from './project.inlang/settings.json'
const { CDN_URL } = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '')

export default defineConfig({
  env: {
    schema: {
      MAILSERVER: envField.string({ context: 'server', access: 'secret', default: '{}' }),
      DATABASE_USER: envField.string({ context: 'server', access: 'secret', default: '' }),
      DATABASE_PWD: envField.string({ context: 'server', access: 'secret', default: '' }),
      DATABASE_HOST: envField.string({ context: 'server', access: 'secret', default: 'localhost' }),
      DATABASE_NAME: envField.string({ context: 'server', access: 'secret', default: 'soc-local' }),
      DATABASE_PORT: envField.number({ context: 'server', access: 'secret', default: 3306 }),
      BETTER_AUTH_SECRET: envField.string({ context: 'server', access: 'secret', default: '' }),
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
      S3_ENDPOINT: envField.string({ context: 'server', access: 'secret', url: true, default: '' }),
      S3_REGION: envField.string({ context: 'server', access: 'secret', default: 'global' }),
      S3_BUCKET: envField.string({ context: 'server', access: 'secret', default: '' }),
      S3_ID: envField.string({ context: 'server', access: 'secret', default: '' }),
      S3_SECRET: envField.string({ context: 'server', access: 'secret', default: '' }),
      CDN_URL: envField.string({ context: 'client', access: 'public', url: true })
    },
    validateSecrets: true
  },
  site: 'https://sittingonclouds.net',
  i18n: {
    locales,
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [icon({ iconDir: 'src/img/icons', svgoOptions: { plugins: ['collapseGroups'] } }), react()],
  vite: {
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide'
      }),
      tsconfigPaths(),
      svgr({
        svgrOptions: {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx']
        }
      })
    ]
  },
  image: { domains: [CDN_URL] },
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
