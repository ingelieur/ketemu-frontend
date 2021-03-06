import React from 'react'
import { StyleSheet, View, Modal, Alert} from 'react-native'
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

import Axios from 'axios'
import { NavigationActions } from 'react-navigation'


import AddParticipants from '../components/AddParticipantsInDetails'

class CreatorDetailsTBA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allConfirmed: false,
      isModal: false,
    }
  }

  componentDidMount() {
    let rsvpArray = this.props.meeting.participants.filter((participant) => {
      return participant.status === 'no' || participant.status === 'pending'
    }) || []
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
    const goToUpcomingScreen = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LandingPage' })
      ]
    })
    let participants = users.map(user => {
      return {user: user.user._id, status: user.status}
    })
    Axios.put(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/editmeetup/${id}`, {
      participants: [...participants]
    })
      .then((response) => {
        this.setState({
          isModal: false,
        })
        this.props.navigateApp.dispatch(goToUpcomingScreen)
      })
      .catch((error) => {
        this.setState({
          isModal: false
        })
      })
  }

  cancelMeeting(id) {
    Axios.delete(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/deletemeetup/${id}`)
      .then(() => {
        this.props.navigateApp.navigate('LandingPage')
      })
      .catch((error) => {
      })
  }

  render() {
    let hours = new Date(this.props.meeting.meetingTime).getHours() < 10 ? `0${new Date(this.props.meeting.meetingTime).getHours()}` : `${new Date(this.props.meeting.meetingTime).getHours()}`
    let minutes = new Date(this.props.meeting.meetingTime).getMinutes() <10 ? `0${new Date(this.props.meeting.meetingTime).getMinutes()}` : `${new Date(this.props.meeting.meetingTime).getMinutes()}`
    return (
      <Container>
        <Content>
          <Card style={{flex: 0, marginLeft:4, marginRight:4}}>
            <CardItem>
              <Left>
                <Thumbnail square size={80} source={require('../assets/Quedaricon.png')} />
                <Body style={{flex:1, flexWrap: 'wrap'}}>
                  <Text style={{fontWeight: 'bold'}}>{this.props.meeting.title}</Text>
                  <Text>
                    {`${new Date(this.props.meeting.meetingTime).getDate()}/${new Date(this.props.meeting.meetingTime).getMonth()+1}/${new Date(this.props.meeting.meetingTime).getFullYear()} ${hours}:${minutes}`}
                  </Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem style={{marginTop:-10}}>
              <Body style={{marginTop:-5}}>
                <View style={styles.container}>
                  <View style={{flex:1, flexDirection:'row', marginTop:8}}>
                    <Text style={{fontWeight: 'bold'}}>Place : </Text>
                    {new Date() > new Date(this.props.meeting.confirmationTime) || this.state.allConfirmed ? (
                      <Button success style={{height:28}} onPress={() => this.setPlace()}>
                        <Text>Set place</Text>
                      </Button>
                    ) : (
                      <Text>TBA {`\n`} Waiting for participants' confirmations. {`\n`}Please be patient...</Text>
                    )}
                  </View>

                  <View style={{flex:1, flexDirection:'row', flexWrap: 'wrap', marginBottom:5}}>
                    <Text style={{fontWeight: 'bold'}}>Description : </Text>
                    <Text>{this.props.meeting.description}</Text>
                  </View>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <Button onPress={() => this.openAddParticipants()} info style={{marginRight:3}}>
                      <Text>
                        Add Participant(s)
                      </Text>
                    </Button>

                    <Button danger style={{marginLeft:3}}>
                      <Text onPress={() => Alert.alert(
                          'Cancel Meeting',
                          'Are you sure?',
                          [
                            {text: 'NO', onPress: () => {}, style: 'cancel'},
                            {text: 'YES', onPress: () => this.cancelMeeting(this.props.meeting._id)},
                          ],
                          { cancelable: false }
                        )}>
                        Cancel Meeting
                      </Text>
                    </Button>
                  </View>

                </View>
              </Body>
            </CardItem>

          </Card>
        </Content>

        <Modal animationType={"slide"} transparent={false} visible={this.state.isModal}
          onRequestClose={() => {this.closeAddParticipants()}}
          style={styles.container}>

          <View style={styles.container}>
            <AddParticipants style={styles.container} meetup={this.props.meeting} addParticipants={this.addParticipants}></AddParticipants>
          </View>
        </Modal>

      </Container>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default CreatorDetailsTBA
