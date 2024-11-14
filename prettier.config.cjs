const prettierConfigStandard = require('prettier-config-standard')

/** @type {import("prettier").Config} */
const config = {...prettierConfigStandard, printWidth: 120}

module.exports = config
