import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Item, Input, Button } from 'native-base';
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { ModalChoosePlace, Profile } from '../containers'
import { changeTrueModalPlaces } from '../actions'

class AddTitle extends React.Component {

  render() {
    const navigasiNext = this.props.navigation.navigate;
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Title
                </Text>
                <Item regular regular style={{marginTop:1, height:30}}>
                  <Input />
                </Item>

                <Text style={{marginTop:7}}>
                  Description
                </Text>
                <Item regular style={{marginTop:1, height:30}}>
                  <Input />
                </Item>

                <Text style={{marginTop:7}}>
                  Date
                </Text>
                <Item regular style={{marginTop:1, height:30}}>
                  <Input />
                </Item>

                { this.props.createMeetUp.placeType == '' ?
                  (<Text></Text>) : (
                    <Text style={{marginTop:7}}>
                    Place Type : {this.props.createMeetUp.placeType}
                    </Text>
                  )
                }

                <Button info style={{height:30, marginTop:20}} onPress={this.props.changeTrueModal}><Text> Choose Place </Text></Button>



                <Modal isVisible={this.props.valueModal}>
                  <View style={{ flex: 1 }}>
                    <ModalChoosePlace />
                  </View>
                </Modal>
              </Body>
            </CardItem>

         </Card>
        </Content>

        <Button full onPress={()=> navigasiNext('AddParticipants')}>
          <Text>Next</Text>
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    valueModal:state.valueModalPlaces,
    createMeetUp: state.createMeetUp,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    changeTrueModal:()=>dispatch(changeTrueModalPlaces())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddTitle)
