import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Item, Input, Button } from 'native-base';

export default class AddParticipants extends React.Component {
  render() {
    const navigasiNext = this.props.navigation.navigate;
    return (
      <Container>
        <Content>
          <Card style={{marginLeft:4, marginRight:4}}>
            <CardItem header>
              <Text>Add Ur Friend To Meeting</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Add His/Her Username
                </Text>
                <Item regular regular style={{marginTop:1, height:30}}>
                  <Input />
                </Item>
              </Body>
            </CardItem>

         </Card>
        </Content>

        <Button full onPress={()=> navigasiNext('AddConfirmationDeadline')}>
          <Text>Next</Text>
        </Button>
      </Container>
    )
  }
}
