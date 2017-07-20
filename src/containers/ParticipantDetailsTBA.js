import React from 'react'
import { StyleSheet, View, Alert, Picker, Modal, } from 'react-native'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { NavigationActions } from 'react-navigation'
import moment from 'moment-business-time'

import { FindAddress } from '../components'

class ParticipantDetailsTBA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      RSVP: this.props.meeting.participants.find(participant => {
        return participant.user._id == this.props.users.id
      }).status,
      locationName: this.props.meeting.participants.find(participant => {
        return participant.user._id == this.props.users.id
      }).locationName,
      locationGeolocation: '',
      defaultAddresss: '',
      isOtherLocationModal: false,
      addressType:'',
    }
  }

  componentDidMount() {
    if(this.state.locationName == '') {
      this.homeOrOffice(this.props.meeting.meetingTime)
    }
  }

  homeOrOffice = (meetingTime) => {
    let bussinessHour = moment(meetingTime).isWorkingTime()
    if(bussinessHour){
      this.setState({
        defaultAddress: 'office',
        addressType: 'Office',
      })
    } else {
      this.setState({
        defaultAddress: 'home',
        addressType: 'Home'
      })
    }
  }

  onCalloutPress = (results) => {
    this.setState({
      isOtherLocationModal: false,
      locationName: results.placeName,
      locationGeolocation: [results.latitude, results.longitude],
    })
  }

  handleRSVP = (decision) => {
    //const goToUpcomingScreen = NavigationActions.reset({
    //  index: 0,
    //  action: [
    //    NavigationActions.navigate({ routeName: 'LandingPage' })
    //  ]
    //})
    Axios.put(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/confirmattendance/${this.props.meeting._id}`, {id: this.props.users.id, status: decision})
      .then ((response) => {
        console.log('Axios pertama ', response)
        //this.setState({
        //  RSVP: decision,
        //})
        //this.props.navigateApp.dispatch(goToUpcomingScreen)
        if (this.state.addressType !== 'others') {
          Axios.get(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/detailuser/${this.props.users.id}`)
            .then((response) => {
              let locationName = response.data[`${this.state.defaultAddress}AddressName`]
              let locationGeolocation = response.data[`${this.state.defaultAddress}AddressGeolocation`]
              let bodyChangeLocation = {id: this.props.users.id, locationName: locationName, locationGeolocation: locationGeolocation}
              console.log('YANG MAU DIUBAH: ', bodyChangeLocation)
              Axios.put(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/participantlocation/${this.props.meeting._id}`, bodyChangeLocation)
                .then((response) => {
                  console.log('RESPONSE GEOLOCATION', response)
                })
            })
        }
        else {
          Axios.put(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/confirmattendance/${this.props.meeting._id}`, {id: this.props.users.id, locationName: this.state.locationName, locationGeolocation: this.state.locationGeolocation})
            .then ((response) => {
              console.log('change location : ', response)
            })
        }
      })
      .catch((error) => {
        console.log(error)
      })
    this.props.navigateApp.navigate('LandingPage')
  }

  changeLocation = ((itemValue, itemIndex) => {
    let isOtherLocationModal = itemValue === 'other' ? true : false
    this.setState({
      addressType: itemValue,
      isOtherLocationModal: isOtherLocationModal,
    }, () => console.log('DIPENCET LOH!!!', this.state.locationName))
  })

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
                  {/*{ this.state.locationName == '' ? (
                    <Text>Where will you be around the meeting time?</Text> ) : null
                  }*/}
                  { this.state.RSVP==='pending'?(
                    <View style={{flex:1, flexDirection: 'column'}}>
                      <Text>Where will you be around the meeting time?</Text>
                      <Picker
                        selectedValue={this.state.addressType}
                        onValueChange={(itemValue, itemIndex) => this.changeLocation(itemValue, itemIndex)}>
                        <Picker.Item label={this.state.defaultAddress} value={this.state.defaultAddress} />
                        <Picker.Item label="Other location" value="other" />
                      </Picker>
                      <View style={{flex:1, flexDirection:'row'}}>
                        <Button info style={{marginRight:3}}>
                          <Text onPress={() =>
                              this.handleRSVP('yes')}>
                              IM GOING
                            </Text>
                          </Button>

                          <Button danger style={{marginLeft:3}}>
                            <Text onPress={() => Alert.alert(
                              'Not Going',
                              'Are you sure?',
                              [
                                {text: 'NO', onPress: () => {}, style: 'cancel'},
                                {text: 'YES', onPress: () => this.handleRSVP('no')},
                              ],
                              { cancelable: false }
                            )}>
                            NOT GOING
                          </Text>
                        </Button>
                      </View>
                    </View>
                  ):(
                    <View style={{flex:1, flexDirection:'row'}}>
                      <Button success style={{marginRight:3}}>
                        <Text>
                          You RSVP to this Event
                        </Text>
                      </Button>
                    </View>
                  )}



                  <View style={{flex:1, flexDirection:'row', marginTop:8}}>
                    <Text style={{fontWeight: 'bold'}}>Place : </Text>
                    <Text>TBA</Text>
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
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.isOtherLocationModal}
          onRequestClose={() => {}}
          style={styles.container}
        >
          <View style={styles.container}>
            <FindAddress style={styles.container} onCalloutPress={this.onCalloutPress} addressType={this.state.addressType}></FindAddress>
          </View>
        </Modal>
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

export default connect(mapStateToProps, null)(ParticipantDetailsTBA)
