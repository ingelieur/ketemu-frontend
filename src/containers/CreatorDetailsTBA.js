import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Modal,
} from 'react-native'
import Axios from 'axios'

import AddParticipants from '../components/AddParticipantsInDetails'

class CreatorDetailsTBA extends React.Component {
  constructor(props) {
    super(props)
    console.log('iiiiiiiiidddddd', this.props.meeting._id)
    this.state = {
      allConfirmed: false,
      isModal: false,
    }
  }

  componentDidMount() {
    let rsvpArray = this.props.meeting.participants.filter((participant) => {
      return participant.status === 'no' || participant.status === 'pending'
    }) || []
    console.log('creator details', rsvpArray)
    rsvpArray.length > 0 ? null : this.setState({allConfirmed: true})
  }

  setPlace() {
    this.props.navigateApp.navigate('SetPlace', {meetupId: this.props.meeting._id})
  }

  openAddParticipants() {
    this.setState({
      isModal: true,
    })
  }

  closeAddParticipants() {
    this.setState({
      isModal: false,
    })
  }

  addParticipants = (id, users) => {
    let participantsId = users.map(user => {
      return {user: user._id}
    })
    console.log('LASLSALSALSDJAKSDJA', participantsId)
    console.log('IIIISSSDDD', id)
    Axios.put(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/editmeetup/${id}`, {
      participants: [...participantsId]
    })
      .then((response) => {
        console.log('RESPONSESSSS', response.data)
        console.log('participants added!')
        this.setState({
          isModal: false,
        })
        this.props.screenProps.navigateApp.navigate('LandingPage')
      })
      .catch((error) => {
        console.log('error cuy!', error)
        this.setState({
          isModal: false
        })
      })
  }

  cancelMeeting(id) {
    console.log('axioooos looo')
    console.log(id)
    Axios.delete(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/deletemeetup/${id}`)
      .then(() => {
        console.log('success')
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
          onPress={() => this.openAddParticipants()}
          title="Add Participant(s)"
        />
        <Button
          onPress={() => this.cancelMeeting(this.props.meeting._id)}
          title="Cancel Meeting"
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.isModal}
          onRequestClose={() => {this.closeAddParticipants()}}
          style={styles.container}
        >
          <View style={styles.container}>
            <AddParticipants style={styles.container} meetup={this.props.meeting} addParticipants={this.addParticipants}></AddParticipants>
          </View>
        </Modal>
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
