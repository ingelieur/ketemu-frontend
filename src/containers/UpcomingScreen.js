import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Button, Icon, Fab } from 'native-base';
import { ButtonAddMeeting, CardUpcomingAndHistory } from '../components'
import { connect } from 'react-redux'
import { Spinner } from 'native-base';

class UpcomingScreen extends Component {
  constructor(props){
    super(props)

  }

  detailMeetUp(id){
    this.props.screenProps.navigateApp.navigate('MeetingDetails', {id})
  }

  render() {
    if(this.props.meetings.length == 0){
      return(
        <View style={{flex:1}}>
          <View style={{flex:1,backgroundColor:'#99d6ff',justifyContent:'center',alignItems:'center'}}>
            <Spinner />
            <Text style={{color:'white', fontWeight:'bold',fontSize:20}}>
              Loading...
            </Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.parentView}>
          <Container style={styles.upcomingData}>
            <Content>
            { this.props.meetings.filter((meeting)=> {
                return new Date(meeting.meetingTime) > new Date() && meeting.status === 'TBA'
              }).map((meeting) => {
                return(
                  <CardUpcomingAndHistory key={meeting._id} detailMeetUp={()=>this.detailMeetUp(meeting._id)} meetupData={meeting}/>
                )
              })
            }
            { this.props.meetings.filter((meeting)=> {
                return new Date(meeting.meetingTime) > new Date() && meeting.status === 'upcoming'
              }).map((meeting) => {
                return(
                  <CardUpcomingAndHistory key={meeting._id} detailMeetUp={()=>this.detailMeetUp(meeting._id)} meetupData={meeting}/>
                )
              })
            }
            </Content>
            <ButtonAddMeeting navigateApp={this.props.screenProps.navigateApp}/>
          </Container>
        </View>
      );
    }

  }

  addMeeting(){
    alert('oke')
  }

}

const styles = {
  parentView:{
    flex:1,
    backgroundColor:'#99d6ff'
  },
  upcomingData:{
    flex:40
  }
};

const mapStateToProps = (state)=>{
  return{
    users:state.users,
    meetings:state.meetings
  }
}

export default connect(mapStateToProps, null) (UpcomingScreen)
