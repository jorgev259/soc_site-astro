import neostandard from 'neostandard'
import eslintConfigPrettier from 'eslint-config-prettier'

import eslintPluginAstro from 'eslint-plugin-astro'

/** @type {import("eslint").Linter.Config} */
export default [
  ...neostandard(),
  eslintConfigPrettier,
  ...eslintPluginAstro.configs.recommended
]
