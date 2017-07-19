import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import Axios from 'axios'
import { connect } from 'react-redux'

class ParticipantDetailsTBA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      RSVP: this.props.meeting.participants.find(participant => {
        return participant.user._id == this.props.users.id
      }).status
    }
  }

  handleRSVP = (decision) => {
    Axios.put(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/confirmattendance/${this.props.meeting._id}`, {id: this.props.users.id, status: decision})
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
    let hours = new Date(this.props.meeting.meetingTime).getHours() < 10 ? `0${new Date(this.props.meeting.meetingTime).getHours()}` : `${new Date(this.props.meeting.meetingTime).getHours()}`
    let minutes = new Date(this.props.meeting.meetingTime).getMinutes() <10 ? `0${new Date(this.props.meeting.meetingTime).getMinutes()}` : `${new Date(this.props.meeting.meetingTime).getMinutes()}`
    return (
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold'}}>Name: </Text>
        <Text>{this.props.meeting.title}</Text>
        <Text style={{fontWeight: 'bold'}}>Time: </Text>
        <Text>
          {`${new Date(this.props.meeting.meetingTime).getDate()}/${new Date(this.props.meeting.meetingTime).getMonth()+1}/${new Date(this.props.meeting.meetingTime).getFullYear()} ${hours}:${minutes}`}
        </Text>
        <Text style={{fontWeight: 'bold'}}>Place: </Text>
        <Text>TBA</Text>
        <Text>So, are you coming? </Text>
        <Text
          onPress={() => this.handleRSVP('yes')}
          style={this.state.RSVP === 'yes' ? {fontWeight: 'bold'} : {}}
        >
          Yes
        </Text>
        <Text
          onPress={() => this.handleRSVP('no')}
        >
          No
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
  },
})

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

export default connect(mapStateToProps, null)(ParticipantDetailsTBA)
