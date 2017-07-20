import React, { Component } from 'react';
import { View, } from 'react-native';
import { Container, Content, Text, } from 'native-base';
import { connect } from 'react-redux'

import { ButtonAddMeeting, CardUpcomingAndHistory } from '../components'

class HistoryScreen extends Component {
  detailMeetUp(id){
    this.props.screenProps.navigateApp.navigate('MeetingDetails', {id})
  }

  render() {
    let historyMeetings = this.props.meetings.filter((meeting)=> {
      return new Date(meeting.meetingTime) < new Date()
    })
    return (
      <View style={styles.parentView}>
        { historyMeetings.length == 0 ? (
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white', fontWeight:'bold',fontSize:20}}>
              You currently have no schedules
            </Text>
            <ButtonAddMeeting navigateApp={this.props.screenProps.navigateApp}/>
          </View>
        ) : (
          <Container style={styles.historyData}>
            <Content>
              { historyMeetings.length == 0 ? (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{color:'white', fontWeight:'bold',fontSize:20}}>
                    You currently have no schedules
                  </Text>
                </View>
              ) : null
              }
              { this.props.meetings.filter((meeting)=> {
                return new Date(meeting.meetingTime) < new Date()
              })
                  .sort((a,b) => {
                    return new Date(a.meetingTime) - new Date(b.meetingTime)
                  })
                  .map((meeting) => {
                    return(
                      <CardUpcomingAndHistory key={meeting._id} detailMeetUp={()=>this.detailMeetUp(meeting._id)} meetupData={meeting}/>
                    )
                  })
              }
            </Content>
            <ButtonAddMeeting navigateApp={this.props.screenProps.navigateApp}/>
          </Container>
        )
        }
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
