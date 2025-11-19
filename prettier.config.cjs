const prettierConfigStandard = require('prettier-config-standard')

/** @type {import("prettier").Config} */
const config = {
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ],
  ...prettierConfigStandard,
  printWidth: 120
}

module.exports = config
