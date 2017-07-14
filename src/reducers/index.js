import { combineReducers } from 'redux'

import usersReducer from './usersReducer'
import meetingsReducer from './meetingsReducer'
import typeofPlacesReducer from './typeofPlacesReducer'
import modalPlacesReducer from './modalPlacesReducer'
import createMeetUpReducer from './createMeetUpReducer'

export default combineReducers({
  users:usersReducer,
  meetings:meetingsReducer,
  typeofPlaces:typeofPlacesReducer,
  valueModalPlaces: modalPlacesReducer,
  createMeetUp:createMeetUpReducer,
})
