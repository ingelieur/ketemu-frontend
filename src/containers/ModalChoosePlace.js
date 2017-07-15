import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Icon, Right, Button, Text, Image,  List, ListItem, Left, Body, Switch, Thumbnail } from 'native-base';
import { connect } from 'react-redux'
import { changeFalseModalPlaces, chooseMeetPlace } from '../actions'

class ModalChoosePlace extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <List>
            { this.props.places.map((place)=> {
                return (
                  <ListItem key={place.id}>
                    <Text onPress={() => this.changePlace(place.type)}>{place.name}</Text>
                  </ListItem>
                )
              })
            }
          </List>
        </Content>

        <View style={styles.parentView}>
          <Button full danger onPress={this.props.changeFalseModal}>
            <Text>CANCEL</Text>
          </Button>
        </View>
      </Container>
    )
  }

  changePlace(place){
    this.props.choosePlace(place)
    this.props.changeFalseModal()
  }

}

const styles = {
  container:{
    backgroundColor:'#FFFFFF',
    flex:1,
  },
  parentView:{
    backgroundColor:'#FFFFFF'
  },
  userView:{
    flex:1,
    backgroundColor: '#F5F5F5'
  },
};

const mapStateToProps = (state)=>{
  return{
    places:state.typeofPlaces
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    changeFalseModal:()=>dispatch(changeFalseModalPlaces()),
    choosePlace:(place)=>dispatch(chooseMeetPlace(place))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ModalChoosePlace)
