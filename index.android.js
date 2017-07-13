/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation'
import { AppRegistry, Text,View } from 'react-native';

import { UpcomingScreen, Profile } from './src/components'

import { Provider } from 'react-redux'
import store from './src/store/configureStore'

export const Tabs = TabNavigator({
  Upcoming: { screen : UpcomingScreen },
  History: { screen : UpcomingScreen },
  Profile: { screen : Profile },
})

export default class ketemuFrontEnd extends Component {
  render() {
    return (
      <Provider store={store}>
        <Tabs />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('ketemuFrontEnd', () => ketemuFrontEnd);
