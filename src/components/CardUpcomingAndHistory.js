import React from 'react'
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Button, Icon, Fab, Badge } from 'native-base';

export default function CardUpcomingAndHistory (props) {
  return (
    <TouchableHighlight style={{flex: 1}} onPress={()=>props.detailMeetUp()}>
      <Card>
        <CardItem style={{backgroundColor:'gainsboro'}} >
          <Body>
            <View style={{flex:1, flexDirection:'row'}}>
              <Icon active name="calendar" />
              <Text style={styles.marginText}>
                {props.meetupData.meetingTime}
              </Text>
                {
                  props.meetupData.status === 'TBA' ?
                  (
                    <Badge success>
                      <Text>2</Text>
                    </Badge>
                  ) : (<View></View>)
                }
            </View>

            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: 'black',
                width: 370,
                marginTop:2
              }}
            />

            <View style={{flex:1, flexDirection:'row', marginTop:5}}>
              <Text>
                {props.meetupData.title}
              </Text>
            </View>

            <View style={{flex:1, flexDirection:'row', marginTop:5}}>
              <Icon active name="pin" />
              <Text style={styles.marginText}>
                {props.meetupData.placeAddressName}
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
