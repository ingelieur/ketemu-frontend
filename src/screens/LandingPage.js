import React from 'react'
import { TabNavigator } from 'react-navigation'

import { UpcomingScreen, HistoryScreen, Profile } from '../containers'

export const Tabs = TabNavigator({
  Upcoming: { screen : UpcomingScreen },
  History: { screen : HistoryScreen },
  Profile: { screen : Profile },
})

export default class LandingPage extends React.Component {
  render() {
    console.log(this.props)
    return (
      <Tabs screenProps={{navigateApp: this.props.navigation}}/>
    )
  }
}
