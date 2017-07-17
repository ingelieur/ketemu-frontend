import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { connect } from 'react-redux'

import ParticipantDetailsTBA from '../containers/ParticipantDetailsTBA'

class MeetingDetails extends React.Component {
  constructor(props) {
    super(props)
    let meeting = this.props.meetings.find((meeting) => {
        return meeting._id === "596b7ca200d456232b86580e"
      })
    this.state = {
      meeting: this.props.meetings.find((meeting) => {
        return meeting._id === "596b7ca200d456232b86580e"
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ParticipantDetailsTBA participants={this.state.meeting.participants}/>
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

const mapStateToProps = (state) => {
  return {
    meetings: state.meetings,
  }
}

export default connect(mapStateToProps, null)(MeetingDetails)
