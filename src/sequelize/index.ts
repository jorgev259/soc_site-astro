import type { MySqlDialect } from '@sequelize/mysql';
import { Sequelize, type ModelStatic, type Options } from '@sequelize/core'

const envOptions: Options<MySqlDialect> = JSON.parse(import.meta.env.SEQUELIZE) || {}
const db = new Sequelize({
  ...envOptions,
  models: Object.values<ModelStatic>(await import.meta.glob('sequelize/models/**/*.ts', { eager: true, import: 'default' }))
})

export default db