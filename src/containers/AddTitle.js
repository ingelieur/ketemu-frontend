import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Item, Input, Button, Icon } from 'native-base';
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { ModalChoosePlace, Profile } from '../containers'
import { changeTrueModalPlaces, inputDateMeetUp, inputTitleMeetUp, inputDescriptionMeetUp } from '../actions'
import  DateTimePicker from 'react-native-modal-datetime-picker';

class AddTitle extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isDateTimePickerVisible: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    if(date.getTime()-Date.now() < 10800000){
      alert('Meeting time should not be less than 3 hours from now')
      this._hideDateTimePicker();
    } else {
      this.props.input_DateMeetUp(date)
      this._hideDateTimePicker();
    }
  };

  handleInputChange = (event) => {
     const target = event.target
     const value = target.value;
     const name = target.name;
     this.setState({
      [name]: value
    });
  }

  render() {
    const navigasiNext = this.props.navigation.navigate;
    return (
      <Container>
        <Content>
          <Card style={{marginLeft:4, marginRight:4}}>
            <CardItem header>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem>
              <Body>
                  <Text>
                    Title
                  </Text>
                  <Item regular regular style={{marginTop:1, height:30}}>
                    <Input
                      onChangeText={(text) => this.props.input_Title(text)}
                    />
                  </Item>

                  <Text style={{marginTop:7}}>
                    Description
                  </Text>
                  <Item regular style={{marginTop:1, height:30}}>
                    <Input
                      onChangeText={(text) => this.props.input_Description(text)}
                    />
                  </Item>

                  <View style={{marginTop:7, flex:1, flexDirection:'row'}}>
                    <Text style={{flex:1}}>
                      Time
                    </Text>

                    <Text style={{flex:1, marginLeft:3}}>
                      Date
                    </Text>
                  </View>

                  <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                      <Button info style={{height:30}} onPress={this._showDateTimePicker}><Icon style={{width:17}} active name="calendar" /></Button>
                      <Item regular style={{flex:12, height:30, marginLeft:3}}>
                        { this.props.createMeetUp.dateMeetUp == '' ?
                          (<Text></Text>) : (
                            <Text style={{marginLeft:4}}>
                              {
                                `${this.props.createMeetUp.dateMeetUp.getHours()}:${this.props.createMeetUp.dateMeetUp.getMinutes()}`
                              }
                            </Text>
                          )
                        }
                      </Item>
                    </View>

                    <View style={{flex:1, flexDirection:'row'}}>
                    <Item regular style={{flex:12, height:30, marginLeft:3}}>
                      { this.props.createMeetUp.dateMeetUp == '' ?
                        (<Text></Text>) : (
                          <Text style={{marginLeft:4}}>
                            {
                              `${this.props.createMeetUp.dateMeetUp.getDate()}/${this.props.createMeetUp.dateMeetUp.getMonth()+1}/${this.props.createMeetUp.dateMeetUp.getFullYear()}`
                            }
                          </Text>
                        )
                      }
                    </Item>
                    </View>
                  </View>

                  <Text style={{marginTop:7}}>
                    Place Type
                  </Text>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:3, flexDirection:'row'}}>
                      <Button info style={{height:30}} onPress={this.props.changeTrueModal}><Icon style={{width:17}} active name="pin" /></Button>
                      <Item regular style={{flex:12, height:30, marginLeft:3}}>
                        { this.props.createMeetUp.placeType == '' ?
                          (<Text></Text>) : (
                            <Text style={{marginLeft:4}}>
                            {this.props.createMeetUp.placeType}
                            </Text>
                          )
                        }
                      </Item>
                    </View>

                    <View style={{flex:1, flexDirection:'row'}}>

                    </View>
                  </View>
              </Body>
            </CardItem>
         </Card>
        </Content>

        <Button full onPress={()=>
            {
              if(this.props.createMeetUp.title == '' || this.props.createMeetUp.description == '' || this.props.createMeetUp.dateMeetUp == '' || this.props.createMeetUp.placeType == ''){
                alert('Data is not complete')
              } else {
                navigasiNext('AddParticipants')
              }
            }}>
          <Text>Next</Text>
        </Button>


        {/* INI POPUP, POSISI TIDAK MEMPENGARUHI */}
        <Modal isVisible={this.props.valueModal}>
          <View style={{ flex: 1 }}>
            <ModalChoosePlace />
          </View>
        </Modal>

        <DateTimePicker
          mode='datetime'
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
        {/* INI POPUP, POSISI TIDAK MEMPENGARUHI */}

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
    input_Title:(title)=>dispatch(inputTitleMeetUp(title)),
    input_Description:(description)=>dispatch(inputDescriptionMeetUp(description)),
    input_DateMeetUp:(date)=>dispatch(inputDateMeetUp(date)),
    changeTrueModal:()=>dispatch(changeTrueModalPlaces())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddTitle)
