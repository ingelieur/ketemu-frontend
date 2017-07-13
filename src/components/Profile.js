import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Icon, Right, Button, Text } from 'native-base';
import { connect } from 'react-redux'

class Profile extends Component {
  render() {
    return (
      <View style={styles.parentView}>

        <View style={styles.userView}>
          <Content>
              <Card>
                <CardItem>
                  <Icon active name="logo-googleplus" />
                  <Text>{ this.props.users.first_name} {this.props.users.last_name} </Text>
                </CardItem>
                <CardItem style={{paddingTop:-5}}>
                   <Icon active name="logo-googleplus" />
                   <Text>{ this.props.users.email }</Text>
                </CardItem>
                <CardItem style={{paddingTop:-5}}>
                  <Icon active name="logo-googleplus" />
                  <Text>{ this.props.users.first_name }</Text>
                </CardItem>
                <CardItem style={{paddingTop:-5}}>
                  <Icon active name="logo-googleplus" />
                  <Text>{ this.props.users.first_name }</Text>
                </CardItem>
               </Card>
          </Content>
        </View>

        <View style={styles.logoutView}>
          <Button full info>
            <Text>Log Out</Text>
          </Button>
        </View>

      </View>
    );
  }

  logOut(){

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

const mapStateToProps = (state)=>{
  return{
    users:state.users
  }
}

export default connect(mapStateToProps, null) (Profile)
