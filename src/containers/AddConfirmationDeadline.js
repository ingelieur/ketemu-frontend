import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, AsyncStorage, Picker, Modal,} from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Item, Input, Button, Icon } from 'native-base';
import { createMeetUp } from '../actions/createMeetUp'
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker';
import axios from 'axios'
import moment from 'moment-business-time'

import { inputDateDeadlineMeetUp } from '../actions'
import { FindAddress } from '../components'

class AddConfirmationDeadline extends Component {
  constructor(props){
    super(props)
    this.state = {
      navigateApp:this.props.screenProps.navigateApp,
      isDateTimePickerVisible: false,
      idUser:'',
      locationName: '',
      locationGeolocation: '',
      defaultAddresss: '',
      isOtherLocationModal: false,
      addressType:'',
    };
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    if(date.getTime()-Date.now() < 60*60*1000){
      alert('Waktu tidak boleh kurang dari sejam dari dari saat ini')
      this._hideDateTimePicker();
    }
    else if(this.props.createMeetUp.dateMeetUp.getTime() - date.getTime() < 60*60*2*1000 ){
      alert('Waktu tidak boleh kurang dari 2 jam dari pertemuan')
      this._hideDateTimePicker();
    }
    else {
      this.props.input_DateDeadline(date)
      this._hideDateTimePicker();
    }
  };

  convertDate(waktu){
    waktu.getHours() < 10 ? jam=`0${waktu.getHours()}` : jam=`${waktu.getHours()}`
    waktu.getMinutes() < 10 ? menit=`0${waktu.getMinutes()}` : menit=`${waktu.getMinutes()}`
    return `${jam}:${menit}`
  }

  componentDidMount(){
    console.log('ADD CONFIRMATION DEADLINE IS MOUNTING')
    AsyncStorage.getItem('id',  (err, id) => {
      if(id){
        this.setState({idUser:id})
      }
      console.log('PROPSADA APA AJA SIH? ',this.props.createMeetUp.dateMeetUp)
      this.homeOrOffice(this.props.createMeetUp.dateMeetUp)
    })
  }

  homeOrOffice = (meetingTime) => {
    console.log('HOMEOROFFICE', meetingTime)
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

  changeLocation = ((itemValue, itemIndex) => {
    console.log('change locaton loh')
    let isOtherLocationModal = itemValue === 'other' ? true : false
    this.setState({
      addressType: itemValue,
      isOtherLocationModal: isOtherLocationModal,
    }, (() => {
      if (this.state.addressType !== 'others') {
        axios.get(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/detailuser/${this.state.idUser}`)
          .then((response) => {
            this.setState({
              locationName: response.data[`${itemValue}AddressName`],
              locationGeolocation: response.data[`${itemValue}AddressGeolocation`]
            })
          })
      }
    }))
  })

  onCalloutPress = (results) => {
    this.setState({
      isOtherLocationModal: false,
      locationName: results.placeName,
      locationGeolocation: [results.latitude, results.longitude],
    })
  }

  createMeetUp(){
    const obj = {
      dataMeetup:{
        title:this.props.createMeetUp.title,
        description:this.props.createMeetUp.description,
        typePlaces:this.props.createMeetUp.placeType,
        meetingTime:this.props.createMeetUp.dateMeetUp,
        creator:this.state.idUser,
        creatorLocationName: this.state.locationName,
        creatorLocationGeolocation: this.state.locationGeolocation,
        participants:this.props.createMeetUp.participants.map((user)=>{
          return { user:user.id }
        }),
        confirmationTime:this.props.createMeetUp.dateDeadlineMeetUp,
      },
      navigateApp:this.state.navigateApp,
    }
    console.log('OOOBBBJJJJJ', obj)
    if(this.props.createMeetUp.title == '' || this.props.createMeetUp.description=='' || this.props.createMeetUp.dateMeetUp == '' || this.props.createMeetUp.placeType == '' || this.props.createMeetUp.dateDeadlineMeetUp == ''){
      alert('Data is not complete')
    } else {
      this.props.create_MeetUp(obj)
    }
  }

  render () {
    console.log('RENDEEEER', this.state.addressType)
    console.log('RENDEEEER', this.state.defaultAddress)
    return (
      <Container>
        <Content>
          <Text>Where will you be around the meeting time?</Text>
          <Picker
            selectedValue={this.state.addressType}
            onValueChange={(itemValue, itemIndex) => this.changeLocation(itemValue, itemIndex)}
          >
            <Picker.Item label="Home" value="home" />
            <Picker.Item label="Office" value="office" />
            <Picker.Item label="Other location" value="other" />
          </Picker>
          <Card style={{marginLeft:4, marginRight:4}}>
            <CardItem header>
              <Text>Set confirmation deadline</Text>
            </CardItem>
            <CardItem>
              <Body>
                <View style={{marginTop:7, flex:1, flexDirection:'row'}}>
                  <Text style={{flex:1}}>
                    Time
                  </Text>

                  <Text style={{flex:1, marginLeft:3}}>
                    Date
                  </Text>
                </View>

                <View style={{flex:1, flexDirection:'row'}}>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <Button info style={{height:30}} onPress={this._showDateTimePicker}><Icon style={{width:17}} active name="calendar" /></Button>
                    <Item regular style={{flex:12, height:30, marginLeft:3}}>
                      { this.props.createMeetUp.dateDeadlineMeetUp == '' ?
                        (<Text></Text>) : (
                          <Text style={{marginLeft:4}}>
                            {
                              this.convertDate(this.props.createMeetUp.dateDeadlineMeetUp)
                            }
                          </Text>
                        )
                      }
                    </Item>
                  </View>

                  <View style={{flex:1, flexDirection:'row'}}>
                    <Item regular style={{flex:12, height:30, marginLeft:3}}>
                      { this.props.createMeetUp.dateDeadlineMeetUp == '' ?
                        (<Text></Text>) : (
                          <Text style={{marginLeft:4}}>
                            {
                              `${this.props.createMeetUp.dateDeadlineMeetUp.getDate()}/${this.props.createMeetUp.dateDeadlineMeetUp.getMonth()+1}/${this.props.createMeetUp.dateDeadlineMeetUp.getFullYear()}`
                            }
                          </Text>
                        )
                      }
                    </Item>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
        </Content>

        <Button full onPress={()=> this.createMeetUp() }>
          <Text>Create</Text>
        </Button>

        <DateTimePicker
          mode='datetime'
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />

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
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    createMeetUp: state.createMeetUp,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    create_MeetUp:(obj)=>dispatch(createMeetUp(obj)),
    input_DateDeadline:(date)=>dispatch(inputDateDeadlineMeetUp(date)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddConfirmationDeadline)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
