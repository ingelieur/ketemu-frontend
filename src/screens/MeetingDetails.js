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
import CreatorDetails from '../containers/CreatorDetails'
import ParticipantDetailsTBA from '../containers/ParticipantDetailsTBA'
import ParticipantDetails from '../containers/ParticipantDetails'


class MeetingDetails extends React.Component {
  constructor(props) {
    super(props)
      console.log('MEETING YANG DIKASIH UNTUK PROPS', this.props.meetings)
    let meetingId = this.props.navigation.state.params.id
    let meeting = this.props.meetings.find((meeting) => {
      return meeting._id == meetingId
    })
    this.state = {
      meeting: meeting,
      role: meeting.creator._id == this.props.users.id ? 'creator' : 'participant',
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
            <ParticipantDetailsTBA navigateApp={this.props.navigation} meeting={this.state.meeting}/>
          )
        ) : (
          this.state.role === 'creator' ? (
            <CreatorDetails navigateApp={this.props.navigation} meeting={this.state.meeting}/>
          ) : (
            <ParticipantDetails meeting={this.state.meeting} />
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
