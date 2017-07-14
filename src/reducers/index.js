import { combineReducers } from 'redux'

import usersReducer from './usersReducer'
import meetingsReducer from './meetingsReducer'

export default combineReducers({
  users:usersReducer,
  meetings:meetingsReducer
})
