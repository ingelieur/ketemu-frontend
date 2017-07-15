const initialState = {
  latitude: 0,
  longitude: 0,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_CURRENT_LOCATION":
      return {...state, ...action.payload}
    default:
      return {...state}
  }
}
