import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'
import eslintConfigPrettier from 'eslint-config-prettier'

import eslintPluginAstro from 'eslint-plugin-astro'

const neoConfig = neostandard({ ignores: resolveIgnoresFromGitignore(), noStyle: true, ts: true})

/** @type {import("eslint").Linter.Config} */
export default [
  ...neoConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-undef': 'error'
    }
  },
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
]
