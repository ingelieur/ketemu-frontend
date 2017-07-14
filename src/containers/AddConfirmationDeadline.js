import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Item, Input, Button, Icon } from 'native-base';

export default class AddConfirmationDeadline extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>Set Confirmation Deadline</Text>
            </CardItem>
            <CardItem>
              <Body>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Icon active name="calendar" />
                  <Item regular style={{marginLeft:7, width:340, height:30}}>
                    <Input />
                  </Item>
                </View>

                <View style={{flex: 1, flexDirection: 'row', marginTop:10}}>
                  <Icon active name="alarm" />
                  <Item regular style={{marginLeft:5, width:340, height:30}}>
                    <Input />
                  </Item>
                </View>

              </Body>
            </CardItem>
         </Card>
        </Content>

        <Button full onPress={()=> {}}>
          <Text>Create Meet Up</Text>
        </Button>
      </Container>
    )
  }
}
