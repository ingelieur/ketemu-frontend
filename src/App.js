import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import {
  LoginRegister,
  Personalization,
  LandingPage,
  CreateMeeting,
  MeetingDetails,
} from './screens'
import store from './store/configureStore'

export const Screens = StackNavigator({
  Personalization: { screen : Personalization },
  LoginRegister: { screen : LoginRegister },
  LandingPage: { screen : LandingPage },
  CreateMeeting: { screen : CreateMeeting },
  MeetingDetails: { screen : MeetingDetails },
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Screens />
      </Provider>
    );
  }
}
