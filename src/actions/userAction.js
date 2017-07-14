import { HAS_LOGGED_IN, HAS_LOGGED_OUT, HAS_SIGNED_UP } from './actionType'

import { AsyncStorage } from 'react-native';

import { NavigationActions } from 'react-navigation'

import axios from 'axios'

export const hasLoggedIn = data => {
    return {
        type: HAS_LOGGED_IN,
        payload: data
    }
}

export const hasLoggedOut = () => {
    return {
        type: HAS_LOGGED_OUT
    }
}

export const hasSignedUp = data => {
  return {
    type: HAS_SIGNED_UP,
    payload: data
  }
}

export const signIn = data => {
  // console.log('data login di action??? ', data)
    return dispatch => {
        axios.post('http://dev-env.gtgwzsbszw.us-west-2.elasticbeanstalk.com/signin', data)
        .then(response => {
            // console.log('data login: ', response.data)
            AsyncStorage.setItem('token', response.data.token, () => {
              AsyncStorage.setItem('user', response.data.username)
              dispatch(hasLoggedIn(response.data))
            })
        })
        .catch(error => {
            console.log(`opps, signin error like this: ${error}`)
        })
    }
}

export const signOut = () => {
  return dispatch => {
    AsyncStorage.removeItem('token', (err, result) => {
      AsyncStorage.removeItem('user')
      dispatch(hasLoggedOut())
    })
  }
}

export const signUp = data => {
  console.log('SIGNUP: !!!! ', data)
  return dispatch => {
    axios.post('http://dev-env.gtgwzsbszw.us-west-2.elasticbeanstalk.com/signup', data)
    .then(response => {
        console.log('data register: ', response.data)
        dispatch(hasSignedUp(response.data))
    })
    .catch(error => {
        console.log(`opps, signUp error like this: ${error}`)
    })
  }
}