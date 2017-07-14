import * as ActionTypes from './actionTypes'
import currentPosition from '../helpers/geolocation'

export const changeFalseModalPlaces = () =>{
  return {
    type:'FALSE_MODAL_PLACE',
  }
}

export const changeTrueModalPlaces = () =>{
  return {
    type:'TRUE_MODAL_PLACE',
  }
}

export const chooseMeetPlace = (place) =>{
  return {
    type:'CHANGE_PLACE',
    payload:place,
  }
}

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
