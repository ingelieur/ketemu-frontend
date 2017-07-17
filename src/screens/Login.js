//import liraries
import React from 'react';
import { View, StyleSheet, TextInput, Button, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Button, Icon, Fab } from 'native-base';
import { connect } from 'react-redux'

import { signIn } from '../actions/userAction'

import { NavigationActions } from 'react-navigation'

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
      token: ''
    }
  }

  _doSignIn() {
    // console.log('username: ', this.state.username)
    // console.log('password: ', this.state.password)
    if (this.state.username.length === 0) {
      alert('Please input field username!')
    } else if (this.state.password.length === 0) {
      alert('Please input field password!')
    } else if (this.state.username.length < 5) {
      alert('Username Minimal must 5 characters')
    } else if (this.state.password.length < 5) {
      alert('Password Minimal must 5 characters')
    } else {
      let dataLogin = {
        username: this.state.username,
        password: this.state.password,
        navigateLogin: this.props.navigation
      }

      this.props.loginData(dataLogin)
    }
  }

  renderRegister() {
    this.props.navigation.navigate('Register')
  }

    render() {
      // console.log('Navigasi: ', this.props)
        return (
          <Container>
            <Content>
              <View style={styles.container}>
                  <Text>Login</Text>
                  <View>
                    <TextInput
                      onChangeText={(text) => this.setState({ username: text })}
                      value={ this.state.username }
                      style={{ width: 300 }}
                      placeholder='input your username'
                    />
                    <TextInput
                      onChangeText={(text) => this.setState({ password: text })}
                      value={ this.state.password }
                      style={{ width: 300 }}
                      secureTextEntry={true}
                      placeholder='input your password'
                    />
                </View>
                <View style={{ marginBottom: 50}}>
                  <Button
                    onPress={() => this._doSignIn() }
                    title="Login"
                    color="#841584"
                    accessibilityLabel="Login"
                  />
                </View>
                <View>
                  <Text onPress={() => this.renderRegister()}>Create a new account!</Text>
                </View>
              </View>
            </Content>
          </Container>    
        );
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
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
