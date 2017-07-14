import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Item, Input, Button } from 'native-base';

export default class AddTitle extends React.Component {
  render() {
    const navigasiNext = this.props.navigation.navigate;
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Title
                </Text>
                <Item regular regular style={{marginTop:1, height:30}}>
                  <Input />
                </Item>

                <Text style={{marginTop:7}}>
                  Description
                </Text>
                <Item regular style={{marginTop:1, height:30}}>
                  <Input />
                </Item>

                <Text style={{marginTop:7}}>
                  Date
                </Text>
                <Item regular style={{marginTop:1, height:30}}>
                  <Input />
                </Item>

                <Text style={{marginTop:7}}>
                  Place Type
                </Text>
                <Item regular style={{marginTop:1, height:30}}>
                  <Input />
                </Item>
              </Body>
            </CardItem>

         </Card>
        </Content>

        <Button full onPress={()=> navigasiNext('AddParticipants')}>
          <Text>Next</Text>
        </Button>
      </Container>
    )
  }
}
