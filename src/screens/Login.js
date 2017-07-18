//import liraries
import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text, } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Card, CardItem, Button, Icon, Spinner } from 'native-base';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { signIn } from '../actions/userAction'

const styles =  StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#E1D7D8',
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

    let username = this.state.password
    let pwd = this.state.password

    let lengthcaseusername = username.length > 0
    let lengthcasepassword = pwd.length > 0

    let isValid = lengthcaseusername && lengthcasepassword

    if (isValid) {
      this.setState({
        renderLogin: true
      })

      let dataLogin = {
        username: this.state.username,
        password: this.state.password,
        navigateLogin: this.props.navigation
      }
      console.log(dataLogin)

      this.setState({
        username: '',
        password: ''
      })

      this.props.loginData(dataLogin)

    } else {
      alert('Please input your username and password!')
    }
  }

  render() {
      return (
        <ScrollView style={styles.scroll}>

          {!this.state.renderLogin ? (
            <Container>
              <Button bordered info style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                <View style={styles.inline}>
                    <Text style={[styles.buttonBlueText, styles.buttonBigText]}>  Connect </Text>
                    <Text style={styles.buttonBlueText}>with Facebook</Text>
                </View>
              </Button>

              <Content>
                <Card style={{paddingBottom: 20}}>
                    <Form>
                      <View style={{ marginLeft: 20, marginTop: 10, marginRight: 20, marginBottom: 10}}>
                        <Label>Username</Label>
                        <Item rounded style={{ height: 35 }}>
                          <Input
                            value={this.state.username}
                            onChangeText={(text) => this.setState({username: text})}
                          />
                        </Item>
                        {this.state.username.length === 0 ? (<Text style={{fontSize: 10, marginBottom: 0, marginLeft: 20, marginRight: 20, color: 'red'}}>* Please input your username!</Text>) : (<Text></Text>)}
                      </View>

                      <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 10}}>
                        <Label>Password</Label>
                        <Item rounded style={{ height: 35 }}>
                          <Input
                            value={this.state.password}
                            onChangeText={(text) => this.setState({password: text})}
                          />
                        </Item>
                        {this.state.password.length === 0 ? (<Text style={{fontSize: 10, marginBottom: 0, marginLeft: 20, marginRight: 20, color: 'red'}}>* Please input your password!</Text>) : (<Text></Text>)}
                      </View>
                    </Form>
                    <Button block auto
                      onPress={() => {this._doSignIn()}}
                      style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}
                    >
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sign In</Text>
                    </Button>

                </Card>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}} onPress={()=>this.renderRegister()} tyle={{fontSize: 18, fontWeight: 'bold'}}>Create a new account...</Text>

                </View>
              </Content>
            </Container>
          ) : (
            <View style={{flex:1}}>
              <Spinner />
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>Loading.....</Text>
            </View>
          )
      }
        </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
    console.log('ini state saat login', state)
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
