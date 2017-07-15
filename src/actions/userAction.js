import { AsyncStorage } from 'react-native';
import axios from 'axios'

import { HAS_LOGGED_IN, HAS_LOGGED_OUT, HAS_SIGNED_UP, HAS_UPDATE_AVATAR, FETCH_USER } from './actionTypes'

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

export const fetchDataUser = data => {
  return dispatch => {
    axios.get(`http://dev-env.gtgwzsbszw.us-west-2.elasticbeanstalk.com/detailuser/${data}`)
    .then(response => {
        console.log('data user: ', response.data)
        dispatch(fetchUser(response.data))
    })
    .catch(error => {
        console.log(`opps, fetchDataUser error like this: ${error}`)
    })
  }
}

export const signIn = data => {
  console.log('data login di action??? ', data)
    return dispatch => {
        axios.post('http://dev-env.gtgwzsbszw.us-west-2.elasticbeanstalk.com/signin', {
          username: data.username,
          password: data.password,
        })
        .then(response => {
            // console.log('data login: ', response.data)
            AsyncStorage.setItem('token', response.data.token, () => {
              AsyncStorage.setItem('user', response.data.username, () => {
                AsyncStorage.setItem('id', response.data.id, () => {

                  AsyncStorage.getItem('id', (err, id) => {

                    if (id) {
                      AsyncStorage.getItem('user', (err, user) => {
                        if (user) {
                          axios.get(`http://dev-env.gtgwzsbszw.us-west-2.elasticbeanstalk.com/detailuser/${id}`)
                          .then(response => {
                              console.log('AAAAAAAA: ?? ', response.data.avatarURL)
                              console.log('AAAAAAAA: ?? ', data.navigateLogin)
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
                                    console.log('@@@@@@@@@@@: ', dataAvatarURL)

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

                  dispatch(hasLoggedIn(response.data))
                  const goPersonalization = NavigationActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Personalization'})
                    ]
                  })

                  data.navigateLogin.dispatch(goPersonalization)
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
        dispatch(hasLoggedOut())
      })
    })
  }
}

export const signUp = data => {
  // console.log('SIGNUP: !!!! ', data)
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

export const updateAvatarUrl = data => {
  console.log('UPDATE AVATAR:!!!! ', data)
  return dispatch => {
    AsyncStorage.getItem('id', (err, id) => {
      console.log('**** USER ID: ', id)
      console.log('**** AVATAR: ', data.uri)

      if (id) {
        axios.put(`http://dev-env.gtgwzsbszw.us-west-2.elasticbeanstalk.com/updateavatar/${id}`, {
          avatar: data
        })
        .then(response => {
          console.log('data update avatar: ', response.data)
          dispatch(hasUpdateAvatar(response.data))
        })
        .catch(error => {
          console.log(`opps, update avatar url error like this: ${error}`);
        })
      }
    })
  }
}
