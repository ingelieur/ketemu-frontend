import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Button, Icon, Fab } from 'native-base';
import { connect } from 'react-redux'

import { ButtonAddMeeting, CardUpcomingAndHistory } from '../components'

class HistoryScreen extends Component {
  detailMeetUp(id){
    this.props.screenProps.navigateApp.navigate('MeetingDetails', {id})
  }

  render() {
    return (
      <View style={styles.parentView}>
        <Container style={styles.historyData}>
          <Content>
            { this.props.meetings.filter((meeting)=> {
                return new Date(meeting.meetingTime) < new Date()
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

const styles = {
  parentView:{
    flex:1,
    backgroundColor:'#99d6ff'
  },
  historyData:{
    flex:1
  },
  createMeetUpView:{
    flex:0.07,
    flexDirection:'column',
    alignItems:'center',
    justifyContent: 'center',
  },
  marginText:{
    paddingTop:2,
    paddingLeft:8
  }
};

const mapStateToProps = (state)=>{
  return{
    meetings:state.meetings
  }
}

export default connect(mapStateToProps, null) (HistoryScreen)
