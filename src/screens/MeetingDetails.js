import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import ParticipantDetailsTBA from '../containers/ParticipantDetailsTBA'

export default class LoginRegister extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ParticipantDetailsTBA />
        <Text>
          The devil is in the details
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
