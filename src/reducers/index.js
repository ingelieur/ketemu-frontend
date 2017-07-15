import { combineReducers } from 'redux'

import usersReducer from './usersReducer'
import meetingsReducer from './meetingsReducer'
import typeofPlacesReducer from './typeofPlacesReducer'
import modalPlacesReducer from './modalPlacesReducer'
import createMeetUpReducer from './createMeetUpReducer'
import positionReducer from './positionReducer'
import screenReducer from './screenReducer'

export default combineReducers({
  users: usersReducer,
  meetings: meetingsReducer,
  positions: positionReducer,
  screen: screenReducer,
  typeofPlaces:typeofPlacesReducer,
  valueModalPlaces: modalPlacesReducer,
  createMeetUp:createMeetUpReducer,
})
