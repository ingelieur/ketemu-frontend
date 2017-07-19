import React from 'react';
import { View, } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Item, Input, Button, ListItem, Badge } from 'native-base';
import { connect } from  'react-redux'
import Axios from 'axios'

class AddParticipants extends React.Component {
  constructor(props) {
    super(props)
    let participants = this.props.meetup.participants.map(user => {
      return user.user
    })
    this.state =  {
      searchUser: '',
      possibleUsers: [],
      users: [...participants],
      updatedUsers: [...this.props.meetup.participants],
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
              return participant._id === possible._id
            })
            return findUsers == undefined
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
    let stateUser = {...user}
    this.setState({
      users: [...this.state.users, stateUser],
      updatedUsers: [...this.state.updatedUsers, {user: {_id: user._id}, status:'pending'}],
      searchUser:'',
      possibleUsers: [],
    })
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
                        <Badge success key={`users.${user._id}`} style={{marginLeft:2, marginRight:2, marginTop:2  }}>
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

        <Button full onPress={()=> this.props.addParticipants(this.props.meetup._id,this.state.updatedUsers)}>
          <Text>Add Participants</Text>
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    users: state.users,
  }
}

export default connect(mapStateToProps, null) (AddParticipants)
