import merge from 'lodash/merge'

import comments from './comments'
import create from './create'
import requests from './requests'
import site from './site'
import update from './update'
import user from './user'

const mutations = merge(comments, create, requests, site, update, user)

export default mutations
