import merge from 'lodash/merge'

import album from './album'
import user from './user'

const types = merge(album, user)

export default types
