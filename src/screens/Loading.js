import React from 'react'

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native'

import { NavigationActions } from 'react-navigation'

class Loading extends React.Component {
  static navigationOptions = {
    title: 'Loading'
  }

  componentDidMount () {
    AsyncStorage.getItem('token', (err, result) => {
      // console.log('hasil!!!!!!!!: ',result);
      // console.log('navigation loading',this.props);
      if (result === null) {
        const goLogin = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login'})
          ]
        })
        this.props.navigation.dispatch(goLogin)
      } else {
        AsyncStorage.getItem('avatarURL', (error, dataAvatarURL) => {
            if (!dataAvatarURL) {
              const goPersonalization = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Personalization'})
                ]
              })

              this.props.navigation.dispatch(goPersonalization)
            } else {
              AsyncStorage.getItem('user', (err, dataUser) => {
                if (dataUser) {
                  const goLandingPage = NavigationActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'LandingPage'})
                    ]
                  })
                  this.props.navigation.dispatch(goLandingPage)
                }
              })
            }
        })
      }
    })
  }

  render () {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }
}

export default Loading