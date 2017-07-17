import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Button, Icon, Fab } from 'native-base';

const CardUpcomingAndHistory= () => {
  return (
    <Card>
      <CardItem style={{backgroundColor:'gainsboro'}} >
        <Body>
          <View style={{flex:1, flexDirection:'row'}}>
            <Icon active name="calendar" />
            <Text style={styles.marginText}>
              Oke
            </Text>
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
              Judul
            </Text>
          </View>

          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
            <Icon active name="pin" />
            <Text style={styles.marginText}>
              Tempat
            </Text>
          </View>
        </Body>
      </CardItem>
    </Card>
  )
}

const styles = {
  marginText:{
    paddingTop:2,
    paddingLeft:8
  }
};

export default CardUpcomingAndHistory
