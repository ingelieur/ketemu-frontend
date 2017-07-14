import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Icon, Right, Button, Text, Image } from 'native-base';
import { connect } from 'react-redux'

import { signOut } from '../actions/userAction'

import { NavigationActions } from 'react-navigation'

class Profile extends Component {

  logOut(){
    console.log('Navigation Logout: ', this.props)
    console.log('+++: ', this.props)
    // alert('Are You Sure')
    this.props.signOutProcess()
    const goLogin = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LoginRegister'})
      ]
    })
    this.props.screenProps.navigateApp.dispatch(goLogin)
  }

  render() {
    console.log('^^^^^: ', this.props)
    return (
      <View style={styles.parentView}>

        <View style={styles.userView}>
          <Content>
              <Card>
                <CardItem>
                  <Icon active name="contact" />
                  <Text>{ this.props.users.first_name} {this.props.users.last_name} </Text>
                </CardItem>
                <CardItem style={{paddingTop:-5}}>
                  <Icon active name="mail" />
                  <Text>{ this.props.users.email }</Text>
                </CardItem>
                <CardItem style={{paddingTop:-5}}>
                  <Icon active name="home" />
                  <Text>{ this.props.users.home }</Text>
                </CardItem>
                <CardItem style={{paddingTop:-5}}>
                  <Icon active name="desktop" />
                  <Text>{ this.props.users.office }</Text>
                </CardItem>
              </Card>
          </Content>
        </View>

        <View style={styles.logoutView}>
          <Button full info onPress={() => this.logOut()}>
            <Text>Log Out</Text>
          </Button>
        </View>

      </View>
    );
  }


}

const styles = {
  parentView:{
    flex:1,
  },
  userView:{
    flex:1,
    backgroundColor: '#F5F5F5'
  },
  logoutView:{
    flex:0.07,
    flexDirection:'column',
    alignItems:'center',
    justifyContent: 'center',
  },
  buttonLogout:{
    width: '100%',
  }
};

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOutProcess: () => {
      dispatch(signOut())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Profile)
