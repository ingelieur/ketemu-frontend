import React from 'react'

import {
  StyleSheet,
  View,
  AsyncStorage,
  Modal,
  TouchableOpacity,
} from 'react-native'

import { Container, Content, Card, CardItem, Text, Body, Button, Icon, Fab, Item, Input } from 'native-base';

import { connect } from 'react-redux'

import { fetchDataUser } from '../actions/userAction'

import FindAddress from '../components/FindAddress'

import { getCurrentLocation, } from '../actions'

import { Line } from '../components'

class FormPersonalization extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isModal: false,
      addressType: '',
      homeAddressName: '',
      homeAddressGeolocation:[],
      officeAddressName: '',
      officeAddressGeolocation:[],
    }
  }

  componentWillMount() {
    this.props.getCurrentLocation()
  }

  componentDidMount() {
    AsyncStorage.getItem('id', (err, id) => {
      if (id) {
        this.props.fetchUser(id)
      }
    })
  }

  onCalloutPress = (results) => {
    this.setState({
      isModal: false,
      [`${results.type}AddressName`]: results.placeName,
      [`${results.type}AddressGeolocation`]: [results.latitude, results.longitude],
    }, () => {
      console.log(this.state)
    })
  }

  handleAddressForm = (addressType) => {
    this.setState({
      isModal: true,
      addressType,
    })
  }

  render() {
    return (
      <View style={styles.parentView}>
        <Container>
          <Content>
            <Card style={{backgroundColor:'gainsboro'}}>
              <CardItem style={{backgroundColor:'gainsboro'}}>
                <Body>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Fullname: </Text>
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-end'}}>
                      <Text>Uci Arahito Lubis</Text>
                    </View>
                  </View>
                  <Line />
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Username: </Text>
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-end'}}>
                      <Text>arahito</Text>
                    </View>
                  </View>
                  <Line />
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Email: </Text>
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-end'}}>
                      <Text>arahitohito@gmail.com</Text>
                    </View>
                  </View>
                  <Line />
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Home Address: </Text>
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-end'}}>
                      <Item success>
                        <Input
                          placeholder={this.state.homeAddressName.length > 0 ? this.state.homeAddressName : `Set your home address`}
                          style={this.state.homeAddressName.length > 0 ? {} : {color: 'lightgray'}}
                        />
                        <TouchableOpacity
                          onPress={() => {this.handleAddressForm('home')}}
                        >
                          <Icon name='pin' />
                        </TouchableOpacity>
                      </Item>
                    </View>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Office Address: </Text>
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-end'}}>
                      <Item success>
                        <Input
                          placeholder={this.state.officeAddressName.length > 0 ? this.state.officeAddressName : `Set your office address`}
                          style={this.state.officeAddressName.length > 0 ? {} : {color: 'lightgray'}}
                        />
                        <TouchableOpacity
                          onPress={() => {this.handleAddressForm('office')}}
                        >
                          <Icon name='pin' />
                        </TouchableOpacity>
                      </Item>
                    </View>
                  </View>

                  <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.isModal}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    style={styles.parentView}
                  >
                    <View style={styles.parentView}>
                      <FindAddress style={styles.parentView} onCalloutPress={this.onCalloutPress} addressType={this.state.addressType}/>
                    </View>
                  </Modal>

                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parentView:{
    flex:1
  },
  upcomingData:{
    flex:4
  },
  marginText:{
    paddingTop:2,
    paddingLeft:8
  },
  formView:{
    flex:1,
    flexDirection: 'row',
    marginTop:5
  }
})

const mapStateToProps = state => {
  console.log('FORMPERSONALIZATION: ', state)
  return {
    name: state.users.name,
    username: state.users.username,
    email: state.users.email,
    avatarURL: state.users.avatarURL,
    officeAddressGeolocation: state.users.officeAddressGeolocation,
    officeAddressName: state.users.officeAddressName,
    homeAddressGeolocation: state.users.homeAddressGeolocation,
    updatedDate: state.users.updatedDate,
    createdDate: state.users.createdDate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: data => dispatch(fetchDataUser(data)),
    getCurrentLocation: () => dispatch(getCurrentLocation())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPersonalization)