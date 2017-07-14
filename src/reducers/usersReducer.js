import { HAS_LOGGED_IN, HAS_LOGGED_OUT } from '../actions/actionType'

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
  office: 'Hacktiv8',
  loginStatus: false
}

const signIn = state => {
  let newState = {
    ...state,
    loginStatus: true
  }
  return newState
}

const signOut = state => {
  let newState = {
    ...state,
    loginStatus: false
  }
  return newState
}

export default(state = initialState, { type }) => {
  switch (type) {
    case HAS_LOGGED_IN:
      return signIn(state)
    case HAS_LOGGED_OUT:
      return signOut(state)
    default:
      return state
  }
}
