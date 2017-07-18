import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native'
import Axios from 'axios'

class CreatorDetails extends React.Component {
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
        <Text>{this.props.meeting.placeAddressName}</Text>
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

export default CreatorDetails
