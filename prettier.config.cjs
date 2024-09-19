const merge = require('lodash/merge')
const prettierConfigStandard = require('prettier-config-standard')

/** @type {import("prettier").Config} */
const config = merge(prettierConfigStandard, {
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ]
})

module.exports = config
