import React, { Component } from 'react';
import { View, StyleSheet, } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Item, Input, Button, ListItem, } from 'native-base';
import Axios from 'axios'

export default class AddParticipants extends React.Component {
  constructor() {
    super()
    this.state =  {
      searchUser: '',
      possibleUsers: [],
      users: [],
    }
  }

  handleUsernameSearch = (text) => {
    this.setState({
      searchUser: text,
    })
    Axios.get(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/searchuser/${text}`)
      .then ((response) => {
        this.setState({
          possibleUsers: response.data,
        })
      })
      .catch ((error) => {
        this.setState({
          possibleUsers: [],
        })
        console.log(error)
        console.log('axios error cuy')
      })
  }

  handleUsernameSelect = (user) => {
    if(this.state.users.find((existedUser) => existedUser._id === user.id)) {
      this.setState({
        possibleUsers: [],
        searchUser: '',
      })
    }
    else {
      let stateUser = {id: user._id, username: user.username}
      this.setState({
        users: [...this.state.users, stateUser],
        searchUser:'',
        possibleUsers: [],
      })
    }
  }

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
                {this.state.users.map((user) => {
                  return (
                    <ListItem style={{backgroundColor: 'red'}} key={`users.${user._id}`}>
                      <Text>{user.username}</Text>
                    </ListItem>
                  )})
                }
                <Text>
                  Add His/Her Username
                </Text>
                <Item regular regular style={{marginTop:1, height:30}}>
                  <Input placeholder='tralala' value={this.state.searchUser} onChangeText={(text) => this.handleUsernameSearch(text)}/>
                </Item>
                { this.state.possibleUsers.map((user) => {
                  return (
                    <ListItem key={`possUsers.${user._id}`}>
                      <Text onPress={() => this.handleUsernameSelect(user)}>{user.username}</Text>
                    </ListItem>
                  )})
                }
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
