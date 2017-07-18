import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native'
import Axios from 'axios'

class CreatorDetailsTBA extends React.Component {
  constructor(props) {
    super(props)
    console.log('iiiiiiiiidddddd', this.props.meeting._id)
    this.state = {
      allConfirmed: false,
    }
  }

  componentDidMount() {
    let rsvpArray = this.props.meeting.participants.find((participant) => {
      return participant.status === 'no' || 'pending'
    }) || []
    console.log('creator details', rsvpArray)
    rsvpArray.length > 0 ? this.setState({...this.state, allConfirmed: true}) : null
  }

  setPlace() {
    this.props.navigateApp.navigate('SetPlace', {meetupId: this.props.meeting._id})
  }

  cancelMeeting(id) {
    console.log('axioooos looo')
    Axios.delete(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/deletemeetup/${id}`)
      .then(() => {
        this.props.navigateApp.navigate('LandingPage')
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
        {new Date() > new Date(this.props.meeting.confirmationTime) || this.state.allConfirmed ? (
          <Button
            onPress={() => this.setPlace()}
            title="Set Place"
          />
        ) : (
          <Text>TBA {`\n`} Waiting for participants' confirmations. {`\n`}Please be patient...</Text>
        )}
        <Button
          onPress={() => this.cancelMeeting(this.props.meeting._id)}
          title="Cancel Meeting"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default CreatorDetailsTBA
