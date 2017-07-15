//import liraries
import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, AsyncStorage } from 'react-native';

import { connect } from 'react-redux'

import { signIn } from '../actions/userAction'

import { NavigationActions } from 'react-navigation'

import Register from './Register'

// create a component
class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      token: ''
    }
  }

  _doSignIn() {
    console.log('username: ', this.state.username)
    console.log('password: ', this.state.password)
    if (this.state.username.length === 0 && this.state.password.length === 0) {
      alert('Please input all field!')
    } else {
      let dataLogin = {
        username: this.state.username,
        password: this.state.password,
      }

      this.props.loginData(dataLogin)

      const goLandingPage = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'LandingPage'})
        ]
      })

      this.props.navigateToLogin.dispatch(goLandingPage)
    }
  }

    render() {
      // console.log('Navigasi: ', this.props)
        return (
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
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

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
