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
    return (
      <View style={styles.container}>
        <Text>PIEChart</Text>
        <Text>Time</Text>
        <Text>Place: TBA </Text>
        <Text>So, are you coming? </Text>
        <Text onPress={() => this.handleRSVP('yes')} style={this.state.RSVP === 'yes' ? {fontWeight: 'bold'} : {}}>Yes</Text>
        <Text onPress={() => this.handleRSVP('no')} >No</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
