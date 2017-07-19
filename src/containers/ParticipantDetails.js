import React from 'react'
import { StyleSheet, View, Alert} from 'react-native'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { NavigationActions } from 'react-navigation'

class ParticipantDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      RSVP: this.props.meeting.participants.find(participant => {
        return participant.user._id == this.props.users.id
      }).status
    }
  }

  handleRSVP = (decision) => {
    const goToUpcomingScreen = NavigationActions.reset({
      index: 0,
      action: [
        NavigationActions.navigate({ routeName: 'LandingPage' })
      ]
    })
    Axios.put(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/confirmattendance/${this.props.meeting._id}`, {id: this.props.users.id, status: decision})
      .then ((response) => {
        this.setState({
          RSVP: decision,
        })
        this.props.navigateApp.dispatch(goToUpcomingScreen)
      })
      .catch((error) => {
        console.log(error)
      })
    this.props.navigateApp.navigate('LandingPage')
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
                    <Text>{this.props.meeting.placeAddressName}</Text>
                  </View>

                  <View style={{flex:1, flexDirection:'row', flexWrap: 'wrap', marginBottom:5}}>
                    <Text style={{fontWeight: 'bold'}}>Description : </Text>
                    <Text>{this.props.meeting.description}</Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
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

export default connect(mapStateToProps, null)(ParticipantDetails)
