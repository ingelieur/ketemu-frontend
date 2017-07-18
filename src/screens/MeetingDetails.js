import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
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
      return meeting._id == meetingId
    })
    console.log('CREAAATOOORRR', meeting.creator)
    console.log('USEEEEERRRRRR', this.props.users.id)
    this.state = {
      meeting: meeting,
      role: meeting.creator == this.props.users.id ? 'creator' : 'participant',
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('id', (err, id) => {
      if(id) {
        this.setState({idUser: id})
        console.log('ASYYYYNC', id)
        console.log(this.props.users.id)
      }
    })
  }

  render() {
    console.log('ROOOOOLE', this.state.role)
    return (
      <View style={styles.container}>
        <PieChart participants={this.state.meeting.participants}/>
        {this.state.meeting.status === 'TBA' ? (
          this.state.role === 'creator' ? (
            <CreatorDetailsTBA navigateApp={this.props.navigation} meeting={this.state.meeting}/>
          ) : (
            <ParticipantDetailsTBA meeting={this.state.meeting}/>
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
