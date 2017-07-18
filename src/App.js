import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import {
  Login,
  Personalization,
  LandingPage,
  CreateMeeting,
  MeetingDetails,
  Loading,
  Register,
  SetPlace,
} from './screens'
import store from './store/configureStore'
export const Screens = StackNavigator({
  //Loading: { screen : Loading },
  //Login: { screen : Login },
  //Register: { screen : Register },
  //Personalization: { screen : Personalization },
  //LandingPage: { screen : LandingPage },
  //CreateMeeting: { screen : CreateMeeting },
  MeetingDetails: { screen : MeetingDetails },
  SetPlace: { screen : SetPlace },
}, { headerMode: 'none' })

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Screens />
      </Provider>
    );
  }
}
