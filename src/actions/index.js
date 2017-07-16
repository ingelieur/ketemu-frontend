import * as ActionTypes from './actionTypes'

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
    console.log('action/index.js')
    navigator.geolocation.getCurrentPosition(position => {
      console.log('aaaaaaa', position)
      let sendPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      }
      dispatch({
        type: ActionTypes.GET_CURRENT_LOCATION,
        payload: sendPosition,
      })
    }
      //,
      //(error) => {
      //  let sendPosition = {
      //    latitude: 0,
      //    longitude: 0,
      //    error,
      //  }
      //  dispatch({
      //    type: ActionTypes.GET_CURRENT_LOCATION,
      //    payload: sendPosition
      //  })
      //}, { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
    )
  }
}