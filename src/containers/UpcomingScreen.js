import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Button, Icon, Fab } from 'native-base';
import { ButtonAddMeeting, CardUpcomingAndHistory } from '../components'
import { connect } from 'react-redux'



class UpcomingScreen extends Component {

  detailMeetUp(id){
    console.log(id);
    alert(`oke, ${id}`)
  }

  render() {
    console.log('UPCOMING SCREEN', this.props)
    if(this.props.meetings.length == 0){
      return(
        <View>
          <Text>Kosong </Text>
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
                var a = 'xxx'
                return(
                  <CardUpcomingAndHistory detailMeetUp={()=>this.detailMeetUp(meeting._id)} meetupData={meeting}/>
                )
              })
            }
            { this.props.meetings.filter((meeting)=> {
                return new Date(meeting.meetingTime) > new Date() && meeting.status === 'upcoming'
              }).map((meeting) => {
                return(
                  <CardUpcomingAndHistory detailMeetUp={()=>this.detailMeetUp(meeting._id)} meetupData={meeting}/>
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
    flex:1
  },
  upcomingData:{
    flex:40
  }
};

const mapStateToProps = (state)=>{
  return{
    meetings:state.meetings
  }
}

export default connect(mapStateToProps, null) (UpcomingScreen)
