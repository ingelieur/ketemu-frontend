import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { connect } from 'react-redux'

import PieChart from '../components/PieChart'
import CreatorDetailsTBA from '../containers/CreatorDetailsTBA'
import ParticipantDetailsTBA from '../containers/ParticipantDetailsTBA'


class MeetingDetails extends React.Component {
  constructor(props) {
    super(props)
    let meetingId = this.props.navigation.state.params.id
    let meeting = this.props.meetings.find((meeting) => {
      console.log(meeting._id)
      return meeting._id == meetingId
    })
    console.log('meetingId', meetingId)
    console.log('CREAAATOOOOR', meeting.creator)
    console.log('IIIIDDD', this.props.users.id)
    this.state = {
      meetingId: meetingId,
      meeting: meeting,
      role: meeting.creator == this.props.users.id ? 'creator' : 'participant',
    }
  }

  render() {
    console.log('ROOOOOLEEEE', this.state.role)
    return (
      <View style={styles.container}>
        <PieChart />
        {this.state.meeting.status === 'TBA' ? (
          this.state.role === 'creator' ? (
            <CreatorDetailsTBA navigateApp={this.props.navigation} meetupId={this.state.meetingId}/>
          ) : (
            <ParticipantDetailsTBA />
          )
        ) : (
          this.state.role === 'creator' ? (
            <Text>CREATOR</Text>
          ) : (
            <Text>PARTICIPANT</Text>
          )
        )
        }
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
    users: state.users,
  }
}

export default connect(mapStateToProps, null)(MeetingDetails)
