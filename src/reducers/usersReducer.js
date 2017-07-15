import { HAS_LOGGED_IN, HAS_LOGGED_OUT, HAS_SIGNED_UP } from '../actions/actionTypes'

const initialState = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  updatedDate: '',
  createdDate: '',
  officeAddressGeolocation: '',
  officeAddressName: '',
  homeAddressGeolocation: '',
  homeAddressName: '',
  home: '',
  loginStatus: false,
  token: '',
  message: ''
}

const signIn = (state, data) => {

  let newState = {
    ...state,
    loginStatus: true,
    token: data.token,
    username: data.username,
    message: data.message
  }
  console.log('USER REDUCER: ', data)
  return newState
}

const signOut = state => {
  let newState = {
    ...state,
    loginStatus: false
  }
  return newState
}

const signUp = (state, data) => {
  let newState = {
    ...state,
    name: data.name,
    username: data.username,
    password: data.password,
    email: data.email
  }
  return newState
}

export default(state = initialState, { type, payload }) => {
  switch (type) {
    case HAS_LOGGED_IN:
      return signIn(state, payload)
    case HAS_LOGGED_OUT:
      return signOut(state)
    case HAS_SIGNED_UP:
      return signUp(state, payload)
    default:
      return state
  }
}
