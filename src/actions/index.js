import * as ActionTypes from './actionTypes'
import currentPosition from '../helpers/geolocation'

export const getCurrentLocation = () => {
  return (dispatch) => {
    currentPosition((position) => {
      position.error ? console.log('error getting current location: ', position.error) : (
        dispatch({
          type: ActionTypes.GET_CURRENT_LOCATION,
          payload: position
        })
      )
    })
  }
}
