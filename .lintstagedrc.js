/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,ts,jsx,tsx,json,yaml,astro}': ['prettier --write', 'eslint --fix']
}
