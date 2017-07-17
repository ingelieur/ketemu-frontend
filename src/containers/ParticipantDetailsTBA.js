import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import Axios from 'axios'

class ParticipantDetailsTBA extends React.Component {
  constructor() {
    super()
    let participant = this.props.participants.find((participant) => {
      return participant.user === this.props.users.id
    })
    this.state = {
      RSVP: participant.status,
    }
  }

  handleRSVP = (decision) => {
    Axios.put(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/confirmattendance/${this.props.meetingId}`, {id: this.props.users.id, status: decision})
      .then ((response) => {
        this.setState({
          RSVP: decision,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>PIEChart</Text>
        <Text>{`\n`}</Text>
        <Text>Time</Text>
        <Text>Place: TBA </Text>
        <Text>{`\n`}</Text>
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

export default ParticipantDetailsTBA
