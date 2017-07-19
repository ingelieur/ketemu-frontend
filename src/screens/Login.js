//import liraries
import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text, TouchableHighlight } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Card, CardItem, Button, Icon, Spinner} from 'native-base';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import axios from 'axios';

import { signIn } from '../actions/userAction'

const styles =  StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#99d6ff',
    padding: 30,
  },
  inline: {
    flexDirection: 'row'
  },
  buttonBlueText: {
    fontSize: 20,
    color: '#3B5699'
  },
  buttonBigText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
})

// create a component
class Login extends React.Component {
  static navigationOptions = {
    title: 'Login'
  }

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      renderLogin: false
    }
  }

  renderRegister() {
    this.props.navigation.navigate('Register')
  }

  _doSignIn() {

    let username = this.state.username
    let pwd = this.state.password

    let lengthcaseusername = username.length > 0
    let lengthcasepassword = pwd.length > 0

    let isValid = lengthcaseusername && lengthcasepassword

    if (isValid) {
      this.setState({
        renderLogin: true
      })
      axios.post('http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/signin', {
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        if(response.data.message=='SignIn success'){
          let dataLogin = {
            username: this.state.username,
            password: this.state.password,
            navigateLogin: this.props.navigation
          }
          this.props.loginData(dataLogin)
        } else if(response.data.message=='Please input the correct username!'){
          alert('Please input the correct username!')
          this.setState({
            renderLogin: false
          })
        } else if(response.data.message=='Please input the correct password!'){
          alert('Please input the correct password!')
          this.setState({
            renderLogin: false
          })
        }
      })
      .catch(err=>{
        alert('Something\'s error with your connection')
        this.setState({
          renderLogin: false
        })
      })
    } else {
      alert('Please input your username and password!')
    }
  }


  render() {
    return (
      <ScrollView style={styles.scroll}>
        <Container>
          <View style={{height:40}}>
            <View style={{flex:1, flexDirection:'row', backgroundColor:'#d9534f'}}>
              <View style={{width:40}}>
                <Icon active name="logo-googleplus" style={{marginLeft:6, marginTop:6}}/>
              </View>
              <View style={{width:4, backgroundColor:'#99d6ff'}}>
                <Text></Text>
              </View>
              <View style={{flex:1}}>
                <Button full danger onPress={() => alert('oke')} style={{width:'100%'}}>
                  <Text style={{color:'white'}}>Login with Gmail</Text>
                </Button>
              </View>
            </View>
          </View>
          <Content>
            <Card style={{paddingBottom: 20}}>
              <Form>
                <View style={{ marginLeft: 20, marginTop: 10, marginRight: 20, marginBottom: 10}}>
                  <Label>Username</Label>
                  <Item regular style={{marginTop:1, height:30}}>
                    <Input
                      value={this.state.username}
                      onChangeText={(text) => this.setState({username: text})}
                    />
                  </Item>
                  {this.state.username.length === 0 ? (<Text style={{fontSize: 10, marginBottom: 0, marginLeft: 20, marginRight: 20, color: 'red'}}>* Please input your username!</Text>) : (<Text></Text>)}
                </View>

                <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 10}}>
                  <Label>Password</Label>
                  <Item regular style={{marginTop:1, height:30}}>
                    <Input
                      secureTextEntry={true}
                      value={this.state.password}
                      onChangeText={(text) => this.setState({password: text})}
                    />
                  </Item>
                  {this.state.password.length === 0 ? (<Text style={{fontSize: 10, marginBottom: 0, marginLeft: 20, marginRight: 20, color: 'red'}}>* Please input your password!</Text>) : (<Text></Text>)}
                </View>
              </Form>
              <View style={{flex:1, flexDirection:'row', marginTop:20}}>
                <View style={{marginLeft:20}}>
                </View>
                <View style={{flex:1, flexDirection:'row'}}>
                  <Button block info onPress={() => {this._doSignIn()}} style={{flex:1}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color:'white'}}>Sign In</Text>
                  </Button>
                  <Button block success onPress={() => {this.renderRegister()}} style={{flex:1}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color:'white'}}>Register</Text>
                  </Button>
                </View>
                <View style={{marginRight:20}}>
                </View>
              </View>
            </Card>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text></Text>
              <Text></Text>
              {this.state.renderLogin ? (
                <View style={{flex:1}}>
                  <Spinner />
                </View>
              ) : null
              }

            </View>
          </Content>
        </Container>
      </ScrollView>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    loginStatus: state.users.loginStatus,
    token: state.users.token,
    username: state.users.username,
    message: state.users.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginData: data => {
      dispatch(signIn(data))
    }
  }
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Login);
