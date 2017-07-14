import { HAS_LOGGED_IN, HAS_LOGGED_OUT } from './actionType'

import axios from 'axios'

export const hasLoggedIn = (user) => {
    return {
        type: HAS_LOGGED_IN,
        payload: user
    }
}

export const hasLoggedOut = () => {
    return {
        type: HAS_LOGGED_OUT
    }
}

export const signIn = (data) => {
    return dispatch => {
        axios.post('http://localhost:3000/signin', data)
        .then(response => {
            console.log('data login: ', response)
            dispatch(hasLoggedIn(response.data))
        })
        .catch(error => {
            console.log(`opps, signin error like this: ${error}`)
        })
    }
}