const initialState = {
  latitude: 0,
  longitude: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_CURRENT_LOCATION":
      return {...state, latitude: action.payload.latitude, longitude: action.payload.longitude}
    default:
      return {...state}
  }
}
