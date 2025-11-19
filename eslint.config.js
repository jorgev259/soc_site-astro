import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginAstro from 'eslint-plugin-astro'

const neoConfig = neostandard({ ignores: resolveIgnoresFromGitignore(), noStyle: true, ts: true })

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
  globalIgnores(['src/paraglide/']),
  ...neoConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-undef': 'error'
    },
    languageOptions: { globals: { ...globals.browser } }
  },
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
  { rules: { 'no-unused-vars': 'warn', camelcase: 'warn' } },
  { files: ['**/*.astro'], rules: { 'react/jsx-key': 'off', 'react/self-closing-comp': 'off' } }
])
