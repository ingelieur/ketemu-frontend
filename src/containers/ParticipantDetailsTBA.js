import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default class ParticipantDetailsTBA extends React.Component {
  constructor() {
    super()
    this.state = {
      RSVP: '',
    }
  }

  handleRSVP = (decision) => {
    this.setState({
      RSVP: decision,
    })
  }

  render() {
    <View style={styles.container}>
      <Text>PIEChart</Text>
      <Text>Are you going? </Text>
      <Text onPress={() => this.handleRSVP('yes')} styles={this.state.RSVP === 'yes' ? {fontWeight: 'bold'} : {}}>Yes</Text>
      <Text>No</Text>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
