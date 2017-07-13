import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Icon, Right, Button, Text } from 'native-base';
import { connect } from 'react-redux'

class UpcomingScreen extends Component {
  render() {
    return (
      <View style={styles.parentView}>
        <Container>
         <Content>
           <Card>
             <CardItem>
               <Icon active name="logo-googleplus" />
               <Text>Google Plus</Text>
               <Right>
                 <Icon name="arrow-forward" />
               </Right>
              </CardItem>
            </Card>
         </Content>
       </Container>
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
};

const mapStateToProps = (state)=>{
  return{
    users:state.users
  }
}

export default connect(mapStateToProps, null) (UpcomingScreen)
