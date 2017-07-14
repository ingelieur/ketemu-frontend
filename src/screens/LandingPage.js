import React from 'react'
import { AsyncStorage } from 'react-native'
import { TabNavigator } from 'react-navigation'

import { UpcomingScreen, HistoryScreen, Profile } from '../containers'

export const Tabs = TabNavigator({
  Upcoming: { screen : UpcomingScreen },
  History: { screen : HistoryScreen },
  Profile: { screen : Profile },
})

export default class LandingPage extends React.Component {

  render() {
    return (
      <Tabs screenProps={{navigateApp: this.props.navigation}}/>
    )
  }
}
