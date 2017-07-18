//import liraries
import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text, AsyncStorage } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Card, CardItem, Button, Icon } from 'native-base';

import { connect } from 'react-redux'

import { signUp } from '../actions/userAction'

import { NavigationActions } from 'react-navigation'

import axios from 'axios'

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
class Register extends React.Component {
  static navigationOptions = {
    title: 'Register'
  }
  constructor() {
    super()
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      email: '',
      re_password: '',
      validationFirstname: false,
      validationLastname: false,
      validationUsername: false,
      validationPasword: false,
      validationEmail: false,
    }
  }

  _doSignUp() {
    let firstname = this.state.firstname
    let lastname = this.state.lastname
    let username = this.state.username
    let pwd = this.state.password
    let email = this.state.email

    let uppercase = /[A-Z]/.test(pwd)
    let lowercase = /[a-z]/.test(pwd)
    let specialcase = /[^a-zA-Z0-9]/.test(pwd)
    let numbercase = /[0-9]/.test(pwd)
    let lengthcase = pwd.length >= 5
    let isValid = uppercase && lowercase && specialcase && numbercase && lengthcase

    if (isValid) {

      axios.get(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/userbyusername/${username}`)
      .then(response => {
        console.log('HAIIIIII!')
        if (response.data.status) {
          let dataRegister = {
            name: this.state.firstname+' '+this.state.lastname,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
          }

          console.log('DATA YG MAU DIKIRIM SAAT REGISTER: ', dataRegister)

          this.props.signUpData(dataRegister)

          this.setState = ({
              firstname: '',
              lastname: '',
              username: '',
              password: '',
              email: '',
          })

          this.props.navigation.navigate('Login')
        } else {
          alert(response.data.message)
        }
      })
    }
  }

  renderValidationFirstname(type, text) {
    let firstname = this.state.firstname
    let textcase = type === 1 && /[a-zA-z]/.test(firstname)
    let lengthcase = type === 2 && firstname.length >= 5
    let result = textcase || lengthcase

    const style = {
      textDecorationLine: result ? 'line-through' : 'none',
      color: 'darkgray'
    }

    return (
      <Text style={style}>
        {text}
      </Text>
    )
  }

  renderValidationLastname(type, text) {
    let lastname = this.state.lastname
    let textcase = type === 1 && /[a-zA-z]/.test(lastname)
    let result = textcase

    const style = {
      textDecorationLine: result ? 'line-through' : 'none',
      color: 'darkgray'
    }

    return (
      <Text style={style}>
        {text}
      </Text>
    )
  }

  renderValidationUsername(type, text) {
    let username = this.state.username
    let lowercase = type === 1 && /[a-z]/.test(username)
    let lengthcase = type === 2 && username.length >= 5
    let result = lowercase || lengthcase

    const style = {
      textDecorationLine: result ? 'line-through' : 'none',
      color: 'darkgray'
    }

    return (
      <Text style={style}>
        {text}
      </Text>
    )
  }

  renderValidationPassword(type, text) {
    let pwd = this.state.password
    let uppercase = type === 1 && /[A-Z]/.test(pwd)
    let lowercase = type === 2 && /[a-z]/.test(pwd)
    let specialcase = type === 3 && /[^a-zA-Z0-9]/.test(pwd)
    let numbercase = type === 4 && /[0-9]/.test(pwd)
    let lengthcase = type === 5 && pwd.length >= 5
    let result = uppercase || lowercase || specialcase || numbercase || lengthcase

    const style = {
      textDecorationLine: result ? 'line-through' : 'none',
      color: 'darkgray'
    }

    return (
      <Text style={style}>
        {text}
      </Text>
    )
  }

  renderValidationEmail(type, text) {
    let email = this.state.email
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailcase = type === 1 && regexEmail.test(email)
    let result = emailcase

    const style = {
      textDecorationLine: result ? 'line-through' : 'none',
      color: 'darkgray'
    }

    return (
      <Text style={style}>
        {text}
      </Text>
    )
  }

  displayValidation() {
    if (this.state.validationFirstname) {
      return (
        <View style={{marginLeft: 20, marginTop: 20}}>
          <Text>Firstname Strength:</Text>
          {this.renderValidationFirstname(1, 'Firstname must be string')}
          {this.renderValidationFirstname(2, 'Minimal Firstname length is 5 characters')}
        </View>
      )
    } else if (this.state.renderValidationLastname) {
      return (
        <View style={{marginLeft: 20, marginTop: 20}}>
          <Text>Lastname Strength:</Text>
          {this.renderValidationLastname(1, 'Lastname must be string')}
        </View>
      )
    } else if (this.state.validationUsername) {
      return (
        <View style={{marginLeft: 20, marginTop: 20}}>
          <Text>Username Strength:</Text>
          {this.renderValidationUsername(1, 'Username must lowercase')}
          {this.renderValidationUsername(2, 'Minimal Username length is 5 characters')}
        </View>
      )
    } else if (this.state.validationPasword) {
      return (
        <View style={{marginLeft: 20, marginTop: 20}}>
          <Text>Password Strength:</Text>
          {this.renderValidationPassword(1, 'Password min 1 karakter huruf besar')}
          {this.renderValidationPassword(2, 'Password min 1 karakter huruf kecil')}
          {this.renderValidationPassword(3, 'Password min 1 spesial karakter')}
          {this.renderValidationPassword(4, 'Password min 1 setidaknya satu angka')}
          {this.renderValidationPassword(5, 'Panjang Password min 5 karakter')}
        </View>
      )
    } else if (this.state.validationEmail) {
      return (
        <View style={{marginLeft: 20, marginTop: 20}}>
          <Text>Email Strength:</Text>
          {this.renderValidationEmail(1, 'Email is not valid')}
        </View>
      )
    }
  }

  renderLogin() {
    this.props.navigation.navigate('Login')
  }

    render() {
        return (
          <ScrollView style={styles.scroll}>
            <Container>
                <Button bordered info style={{ alignSelf: 'center', marginBottom: 20 }}>
                  <View style={styles.inline}>
                      <Text style={[styles.buttonBlueText, styles.buttonBigText]}>  Connect </Text>
                      <Text style={styles.buttonBlueText}>with Facebook</Text>
                  </View>
                </Button>

                <Content>
                  <Card style={{paddingBottom: 15}}>
                      <Form>

                        <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 10, marginTop: 10}}>
                          <Label>Firstname</Label>
                          <Item regular style={{marginTop:1, height:30}}>
                            <Input
                              value={this.state.firstname}
                              onChangeText={(text) => this.setState({firstname: text, validationEmail: false, validationFirstname: true, validationLastname: false, validationUsername: false, validationPasword: false})}
                            />
                          </Item>
                          {this.state.firstname.length === 0 ? (<Text style={{fontSize: 10, marginBottom: 0, marginLeft: 20, marginRight: 20, color: 'red'}}>* Please input your firstname!</Text>) : (<Text></Text>)}
                        </View>

                        <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 10}}>
                          <Label>Lastname</Label>
                          <Item regular style={{marginTop:1, height:30}}>
                            <Input
                              value={this.state.lastname}
                              onChangeText={(text) => this.setState({lastname: text, validationEmail: false, validationFirstname: false, validationLastname: true, validationUsername: false, validationPasword: false})}
                            />
                          </Item>
                        </View>

                        <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 10}}>
                          <Label>Username</Label>
                          <Item regular style={{marginTop:1, height:30}}>
                            <Input
                              value={this.state.username}
                              onChangeText={(text) => this.setState({username: text, validationEmail: false, validationFirstname: false, validationLastname: false, validationUsername: true, validationPasword: false})}
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
                              onChangeText={(text) => this.setState({password: text, validationEmail: false, validationFirstname: false, validationLastname: false, validationPasword: true, validationUsername: false})}
                            />
                          </Item>
                          {this.state.password.length === 0 ? (<Text style={{fontSize: 10, marginBottom: 0, marginLeft: 20, marginRight: 20, color: 'red'}}>* Please input your password!</Text>) : (<Text></Text>)}
                        </View>

                        <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 10}}>
                          <Label>Email</Label>
                          <Item regular style={{marginTop:1, height:30}}>
                            <Input
                              value={this.state.email}
                              onChangeText={(text) => this.setState({email: text, validationEmail: true, validationFirstname: false, validationLastname: false, validationPasword: false, validationUsername: false})}
                            />
                          </Item>
                          {this.state.email.length === 0 ? (<Text style={{fontSize: 10, marginLeft: 20, marginRight: 20, color: 'red'}}>* Please input your email!</Text>) : (<Text></Text>)}
                        </View>

                      </Form>
                      <Button block info
                        onPress={() => {this._doSignUp()}}
                        style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}
                      >
                          <Text style={{fontSize: 20, fontWeight: 'bold', color:'white'}}>SignUp</Text>
                      </Button>
                      {this.displayValidation()}

                  </Card>

                  <View style={{flex: 1,alignItems:'center'}}>
                    <Text></Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}} onPress={() => this.renderLogin()} tyle={{fontSize: 18, fontWeight: 'bold', marginBottom: 5}}>Click here to go back to Login page...</Text>
                  </View>
                </Content>
            </Container>
          </ScrollView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUpData: (data) => {
            dispatch(signUp(data))
        }
    }
}

//make this component available to the app
export default connect(null, mapDispatchToProps)(Register);
