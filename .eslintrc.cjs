import eslintConfigStandard from 'eslint-config-standard'
import eslintConfigPrettier from 'eslint-config-prettier'

import eslintPluginAstro from 'eslint-plugin-astro'

/** @type {import("eslint").Linter.Config} */
module.exports = [
  eslintConfigStandard,
  eslintConfigPrettier,
  eslintPluginAstro.configs.recommended
]
