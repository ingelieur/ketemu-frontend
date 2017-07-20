import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Button, Icon, Fab, Spinner } from 'native-base';
import { ButtonAddMeeting, CardUpcomingAndHistory } from '../components'
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchDataUser } from '../actions/userAction'
import { getAllMeetUps } from '../actions'

class UpcomingScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      refreshing:false
    }
  }

  detailMeetUp(id){
    this.props.screenProps.navigateApp.navigate('MeetingDetails', {id})
  }

  _onRefresh() {
    this.setState({refreshing: true});
    AsyncStorage.getItem('id', (err, id) => {
      if (id) {
        this.props.fetchUser(id)
        axios.get(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/getmeetingsbyparticipant/${id}`)
        .then((meetup)=>{
          this.props.getAllMeetUps(meetup.data)
        })
      }
    })
    this.setState({refreshing: false})
  }

  render() {
    if (this.props.meetings.length !== 0){
      return (
        <View style={{flex:1}}>
        <ScrollView
        style={styles.parentView}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        >
          <Container style={styles.upcomingData}>
            <Content>
            { this.props.meetings.filter((meeting)=> {
                return new Date(meeting.meetingTime) > new Date() && meeting.status === 'TBA'
              }).map((meeting) => {
                return(
                  <CardUpcomingAndHistory key={meeting._id} detailMeetUp={()=>this.detailMeetUp(meeting._id)} meetupData={meeting} userId={this.props.users.id}/>
                )
              })
            }
            { this.props.meetings.filter((meeting)=> {
                return new Date(meeting.meetingTime) > new Date() && meeting.status === 'upcoming'
              }).map((meeting) => {
                return(
                  <CardUpcomingAndHistory key={meeting._id} detailMeetUp={()=>this.detailMeetUp(meeting._id)} meetupData={meeting} userId={this.props.users.id}/>
                )
              })
            }
            </Content>
          </Container>
        </ScrollView>
        <ButtonAddMeeting navigateApp={this.props.screenProps.navigateApp}/>
        </View>
      );
    } else {
      return(
        <View style={{flex:1}}>
        <ScrollView
        style={styles.parentView}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        >
          <View style={{flex:1,backgroundColor:'#b3e0ff',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white', fontWeight:'bold',fontSize:20}}>
              You currently have no schedules
            </Text>
            <ButtonAddMeeting navigateApp={this.props.screenProps.navigateApp}/>
          </View>
        </ScrollView>  
        </View>
      )
    }
  }

}

const styles = {
  parentView:{
    flex:1,
    backgroundColor:'#b3e0ff'
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

const mapDispatchToProps = dispatch => {
  return {
    getAllMeetUps: data=> {
      dispatch(getAllMeetUps(data))
    },
    fetchUser: data => {
      dispatch(fetchDataUser(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (UpcomingScreen)
