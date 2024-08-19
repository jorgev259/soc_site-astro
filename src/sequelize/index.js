import mysql2 from 'mysql2'
import { Sequelize } from 'sequelize'

import relations from './relations'
import models from './models'

const options = process.env.GITHUB_ACTIONS
  ? 'sqlite::memory:'
  : JSON.parse(import.meta.env.SEQUELIZE)

if (!process.env.GITHUB_ACTIONS && options.dialect === 'mysql')
  options.dialectModule = mysql2

if (import.meta.env.DEV && options.logging === undefined)
  options.logging = console.log

const db = new Sequelize(options)

Object.values(models).forEach((model) => model(db))
relations(db)

export default db
