import React from 'react'
import { TabNavigator } from 'react-navigation'

import { UpcomingScreen, HistoryScreen, Profile } from '../components'

export const Tabs = TabNavigator({
  Upcoming: { screen : UpcomingScreen },
  History: { screen : HistoryScreen },
  Profile: { screen : Profile },
})

export default class LandingPage extends React.Component {
  render() {
    return (
      <Tabs />
    )
  }
}
