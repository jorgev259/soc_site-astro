import { Sequelize, type Options } from '@sequelize/core'

import { SEQUELIZE } from 'astro:env/server'

import Album from './models/album';
import Artist from './models/artist';
import Category from './models/category';
import Config from './models/config';
import User from './models/user';

const envOptions: Options = JSON.parse(SEQUELIZE)
envOptions.models = [Album, Artist, Category, Config, User]

const db = new Sequelize(envOptions)

export default db