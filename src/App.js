import React from 'react'
import { TabNavigator } from 'react-navigation'
import { AppRegistry, Text,View } from 'react-native'
import { Provider } from 'react-redux'

import { UpcomingScreen, HistoryScreen, Profile } from './components'
import store from './store/configureStore'

export const Tabs = TabNavigator({
  Upcoming: { screen : UpcomingScreen },
  History: { screen : HistoryScreen },
  Profile: { screen : Profile },
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Tabs />
      </Provider>
    );
  }
}
