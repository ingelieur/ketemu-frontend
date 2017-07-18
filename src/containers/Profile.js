import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Icon, Right, Button, Text, Image } from 'native-base';
import { connect } from 'react-redux'
import { deleteMeetingsWhenLogOut } from '../actions'
import { signOut } from '../actions/userAction'

import { NavigationActions } from 'react-navigation'

class Profile extends Component {
  constructor(props){
    super(props)
  }

  logOut(){
    this.props.signOutProcess()
    const goLogin = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login'})
      ]
    })
    this.props.delete_meetings_when_logout()
    this.props.screenProps.navigateApp.dispatch(goLogin)
  }

  render() {

    return (
      <View style={styles.parentView}>

        <View style={styles.userView}>
          <Content>
              <Card>
                <CardItem>
                  <Icon active name="contact" />
                  <Text>{ this.props.users.name }</Text>
                </CardItem>
                <CardItem style={{paddingTop:-5}}>
                  <Icon active name="mail" />
                  <Text>{
                    this.props.users.email
                  }</Text>
                </CardItem>
                <CardItem style={{paddingTop:-5}}>
                  <Icon active name="home" />
                  <Text>{ this.props.users.homeAddressName }</Text>
                </CardItem>
                <CardItem style={{paddingTop:-5}}>
                  <Icon active name="desktop" />
                  <Text>{ this.props.users.officeAddressName }</Text>
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
    signOutProcess: () => { dispatch(signOut()) },
    delete_meetings_when_logout:()=>dispatch(deleteMeetingsWhenLogOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Profile)
