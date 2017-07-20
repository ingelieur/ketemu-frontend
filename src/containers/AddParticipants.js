import React from 'react';
import { View, } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Item, Input, Button, ListItem, Badge } from 'native-base';
import { inputParticipantsMeetUp } from '../actions/createMeetUp'
import { connect } from  'react-redux'
import Axios from 'axios'

class AddParticipants extends React.Component {
  constructor(props) {
    super(props)
    this.state =  {
      searchUser: '',
      possibleUsers: [],
      users: this.props.createMeetUp.participants,
    }
  }

  handleUsernameSearch = (text) => {
    this.setState({
      searchUser: text,
    })
    Axios.get(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/searchuser/${text}`)
      .then ((response) => {
        let filteredData = response.data.filter((possible) => {
          if (possible._id !== this.props.users.id) {
            let findUsers = this.state.users.find((participant) => {
              return participant.id === possible._id
            })
            if (findUsers == undefined) return true
          }
        })
        this.setState({
          possibleUsers: filteredData,
        })
      })
      .catch ((error) => {
        this.setState({
          possibleUsers: [],
        })
      })
  }

  handleUsernameSelect = (user) => {
    let stateUser = {id: user._id, username: user.username}
    this.setState({
      users: [...this.state.users, stateUser],
      searchUser:'',
      possibleUsers: [],
    })
  }

  createParticipants(){
    const navigasiNext = this.props.navigation.navigate;
    if(this.state.users.length<1){
      alert('You should select at least 1 participant')
    } else {
      this.props.create_Participants(this.state.users)
      navigasiNext('AddConfirmationDeadline')
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Card style={{marginLeft:4, marginRight:4}}>
            <CardItem header>
              <Text>Add Participants</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Item regular style={{marginTop:1, height:30}}>
                  <Input placeholder='Add His/Her Username' value={this.state.searchUser} onChangeText={(text) => this.handleUsernameSearch(text)}/>
                </Item>
                <View style={{flex:1, flexDirection:'row', flexWrap:'wrap'}}>
                  {
                    this.state.users.map((user) => {
                      return (
                        <Badge success key={`users.${user.id}`} style={{marginLeft:2, marginRight:2, marginTop:2  }}>
                          <Text>{user.username}</Text>
                        </Badge>
                      )})
                  }
                </View>

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

        <Button full onPress={()=> this.createParticipants()}>
          <Text>Next</Text>
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    createMeetUp: state.createMeetUp,
    users: state.users,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    create_Participants:(users)=>dispatch(inputParticipantsMeetUp(users)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddParticipants)
