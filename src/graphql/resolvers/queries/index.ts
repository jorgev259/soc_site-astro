import merge from 'lodash/merge'

import search from './search'
import site from './site'
/* 
import album from './album'
import requests from './requests'


import user from './user'
import vgmdb from './vgmdb' 
*/

const queries = merge(search, site)

export default queries
