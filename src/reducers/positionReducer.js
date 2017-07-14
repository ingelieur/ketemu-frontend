const initialState = {
  latitude: 100,
  longitude: 100,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_CURRENT_LOCATION":
      return (action.payload.error ? {...state, error: action.payload.error} : {...state, latitude: action.payload.latitude, longitude: action.payload.longitude})
    default:
      return {...state}
  }
}
