import { HAS_LOGGED_IN, HAS_LOGGED_OUT, HAS_SIGNED_UP, HAS_UPDATE_AVATAR, FETCH_USER, FETCH_ASYNCSTORAGE_ID } from '../actions/actionTypes'

import { AsyncStorage } from 'react-native';

const initialState = {
  id: '',
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  avatarURL: '',
  updatedDate: '',
  createdDate: '',
  officeAddressGeolocation: '',
  officeAddressName: '',
  homeAddressGeolocation: '',
  homeAddressName: '',
  home: '',
  loginStatus: false,
  token: '',
  message: '',
  name: ''
}

const signIn = (state, data) => {
  console.log('DATA USER',data);

  let newState = {
    ...state,
    id: data._id,
    loginStatus: true,
    token: data.token,
    username: data.username,
    message: data.message,
    name:data.name,
    email:data.email,
    homeAddressName:data.homeAddressName,
    officeAddressName:data.officeAddressName,
  }
  // console.log('USER REDUCER: ', data)
  return newState
}

const signOut = state => {
  let newState = {
    ...initialState,
    loginStatus: false
  }
  console.log('aladydydydydyd',newState);
  return newState
}

const signUp = (state, data) => {
  let newState = {
    ...state,
    id: data._id,
    name: data.name,
    username: data.username,
    password: data.password,
    email: data.email
  }
  return newState
}

const updateAvatar = (state, data) => {
  let newState = {
    ...state,
    id: data._id,
    avatarURL: data.avatarURL
  }
  console.log('AVATAR REDUCER: ', data)
  return newState
}

const fetchUser = (state, data) => {
  // console.log('USER DI REDUCERS ***: ', data)
  let newState = {
    ...state,
    id: data._id,
    name: data.name,
    email: data.email,
    officeAddressName: data.officeAddressName,
    officeAddressGeolocation: data.officeAddressGeolocation,
    homeAddressName: data.homeAddressName,
    homeAddressGeolocation: data.homeAddressGeolocation,
    updatedDate: data.updatedDate,
    createdDate: data.createdDate,
    avatarURL: data.avatarURL,
    username: data.username,
  }
  // console.log('FETCHUSER REDUCER: ', data)
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
    case HAS_UPDATE_AVATAR:
      return updateAvatar(state, payload)
    case FETCH_USER:
      return fetchUser(state, payload)
    default:
      return state
  }
}
