import React from 'react'
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Button, Icon, Fab, Badge } from 'native-base';

export default function CardUpcomingAndHistory (props) {
  let user = props.userId ? props.meetupData.participants.find((participant) => {
    return participant.user._id == props.userId }) : undefined
  {
    if(new Date(props.meetupData.meetingTime).getHours()<10){
      hours = `0${new Date(props.meetupData.meetingTime).getHours()}`
    } else {
      hours = `${new Date(props.meetupData.meetingTime).getHours()}`
    }

    if(new Date(props.meetupData.meetingTime).getMinutes()<10){
      minutes = `0${new Date(props.meetupData.meetingTime).getMinutes()}`
    } else {
      minutes = `${new Date(props.meetupData.meetingTime).getMinutes()}`
    }
  }
  return (
    <TouchableHighlight style={{flex: 1}} onPress={()=>props.detailMeetUp()}>
      <Card style={{marginLeft:4, marginRight:4}}>
        <CardItem style={{backgroundColor:'white'}} >
          <Body>
            <View style={{flex:1, flexDirection:'row'}}>
              <Icon active name="calendar" />
              <Text style={styles.marginText}>
                {
                  `${new Date(props.meetupData.meetingTime).getDate()}/${new Date(props.meetupData.meetingTime).getMonth()+1}/${new Date(props.meetupData.meetingTime).getFullYear()} ${hours}:${minutes}`
                }
              </Text>

              <View style={{flex:1, justifyContent: 'space-between', flexDirection:'row'}}>
                <View>

                </View>

                <View >
                  {
                    //props.meetupData.status === 'TBA' && new Date(props.meetupData.meetingTime) > new Date() ?
                    user ? ( user.status === 'pending' && new Date(props.meetupData.meetingTime) > new Date() ?
                      (
                        <Badge info >
                          <Text>RSVP</Text>
                        </Badge>
                      ) : (<View></View>)
                    ): null
                  }
                </View>

              </View>
            </View>

            <View style={{ borderBottomWidth: 2, borderBottomColor: 'black', width:'100%', marginTop:2 }}/>

            <View style={{flex:1, flexDirection:'row', marginTop:5}}>
              <Text>
                {props.meetupData.title}
              </Text>
            </View>

            <View style={{flex:1, flexDirection:'row', marginTop:5}}>
              <Icon active name="pin" />
              <Text style={styles.marginText}>
                { props.meetupData.status ==='TBA' ? props.meetupData.status : props.meetupData.placeAddressName }
              </Text>
            </View>
          </Body>
        </CardItem>
      </Card>
    </TouchableHighlight>

  )
}

const styles = {
  marginText:{
    paddingTop:2,
    paddingLeft:8
  }
};
