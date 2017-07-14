import { HAS_LOGGED_IN, HAS_LOGGED_OUT } from './actionType'

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