import { AsyncStorage } from 'react-native';
import axios from 'axios'

import { HAS_LOGGED_IN, HAS_LOGGED_OUT, HAS_UPDATE_AVATAR, FETCH_USER, EDIT_USER, FETCH_ASYNCSTORAGE_ID } from './actionTypes'

import { NavigationActions } from 'react-navigation'

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

export const hasUpdateAvatar = data => {
  return {
    type: HAS_UPDATE_AVATAR,
    payload: data
  }
}

export const fetchUser = data => {
  return {
    type: FETCH_USER,
    payload: data
  }
}

export const editUser = data => {
  return {
    type: EDIT_USER,
    payload: data
  }
}

export const setAsyncstorage = data => {
  return {
    type: FETCH_ASYNCSTORAGE_ID,
    payload: data
  }
}

export const fetchAsyncstorageId = () => {
  let idUser = ''
  AsyncStorage.getItem('id', (err, id) => {
    if (id) {
      return dispatch => {
        dispatch(setAsyncstorage(id))
      }
    }
  })
}

export const fetchDataUser = data => {
  return dispatch => {
    axios.get(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/detailuser/${data}`)
    .then(response => {
        dispatch(fetchUser(response.data))
    })
    .catch(error => {
        console.log(`opps, fetchDataUser error like this: ${error}`)
    })
  }
}

export const signIn = data => {
    return dispatch => {
        axios.post('http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/signin', {
          username: data.username,
          password: data.password,
        })
        .then(response => {
            AsyncStorage.setItem('token', response.data.token, () => {
              AsyncStorage.setItem('user', response.data.username, () => {
                AsyncStorage.setItem('id', response.data.id, () => {
                  AsyncStorage.getItem('id', (err, id) => {
                    console.log('ID DI ASYNC STORAGE OYYYY: ', id)
                    if (id) {
                      AsyncStorage.getItem('user', (err, user) => {
                        if (user) {
                          axios.get(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/detailuser/${id}`)
                          .then(response => {
                            console.log('DATA YANG DIMASUKKAN KE HASLOGGEDIN: ', response.data)
                              dispatch(hasLoggedIn(response.data))
                              if (response.data.avatarURL == 'https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-6/128/profile-male-circle2-512.png') {
                                const goPersonalization = NavigationActions.reset({
                                  index: 0,
                                  actions: [
                                    NavigationActions.navigate({ routeName: 'Personalization'})
                                  ]
                                })
                                data.navigateLogin.dispatch(goPersonalization)
                              } else {
                                AsyncStorage.setItem('avatarURL', response.data.avatarURL, () => {
                                  AsyncStorage.getItem('avatarURL', (error, dataAvatarURL) => {
                                      if (dataAvatarURL) {
                                        AsyncStorage.getItem('user', (err, dataUser) => {
                                            const goLandingPage = NavigationActions.reset({
                                              index: 0,
                                              actions: [
                                                NavigationActions.navigate({ routeName: 'LandingPage'})
                                              ]
                                            })
                                            data.navigateLogin.dispatch(goLandingPage)
                                        })
                                      }
                                  })
                                })
                              }
                          })
                          .catch(error => {
                              console.log(`opps, fetchDataUser error like this: ${error}`)
                          })
                        }
                      })
                    }
                  })
                })
              })
            })
        })
        .catch(error => {
            console.log(`opps, signin error like this: ${error}`)
        })
    }
}

export const signOut = () => {
  return dispatch => {
    AsyncStorage.removeItem('token', () => {
      AsyncStorage.removeItem('user', () => {
        AsyncStorage.removeItem('id', () => {
        dispatch(hasLoggedOut())
        })
      })
    })
  }
}

export const updateAvatarUrl = data => {
  return dispatch => {
    AsyncStorage.getItem('id', (err, id) => {

      if (id) {
        axios.put(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/updateavatar/${id}`, {
          avatar: data
        })
        .then(response => {

          AsyncStorage.setItem('avatarURL', response.data.avatarURL, () => {
            dispatch(hasUpdateAvatar(response.data))
          })

        })
        .catch(error => {
          console.log(`opps, update avatar url error like this: ${error}`);
        })
      }
    })
  }
}

export const editDataUser = data => {
  return dispatch => {
    AsyncStorage.getItem('id', (err, id) => {
      if (id) {
        axios.put(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/edituser/${id}`, data.dataEdit)
        .then(response => {
          dispatch(editUser(response.data))
          data.navigateToLandingPage.navigate('LandingPage')

        })
        .catch(error => {
          console.log(`opps, update user error like this: ${error}`);
        })
      }
    })
  }
}
