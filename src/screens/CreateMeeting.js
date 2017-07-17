import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AddTitle, AddParticipants, AddConfirmationDeadline } from '../containers'


export const ScreensAddMeeting = StackNavigator({
  AddTitle: { screen : AddTitle },
  AddParticipants: { screen : AddParticipants },
  AddConfirmationDeadline: { screen : AddConfirmationDeadline },
})

export default class CreateMeeting extends React.Component {
  render() {
    return (
      <ScreensAddMeeting screenProps={{navigateApp: this.props.navigation}}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
