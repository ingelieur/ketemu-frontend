import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Modal,
} from 'react-native'
import { connect, } from 'react-redux'

import FindAddress from '../components/FindAddress'
import { getCurrentLocation, } from '../actions'
import ImagePicker from '../containers/ImagePicker'

class Personalization extends React.Component {
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
      <View style={styles.container}>
        {/*<ImagePicker />*/}
        <Text
          onPress={() => {this.handleAddressForm('home')}}
          style={this.state.homeAddressName.length > 0 ? {} : {color: 'lightgray'}}
        >
          {this.state.homeAddressName.length > 0 ? this.state.homeAddressName : `Please set your home address`}
        </Text>
        <Text
          onPress={() => {this.handleAddressForm('office')}}
          style={this.state.officeAddressName.length > 0 ? {} : {color: 'lightgray'}}
        >
          {this.state.officeAddressName.length > 0 ? this.state.officeAddressName : `Please set your office address`}
        </Text>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.isModal}
          onRequestClose={() => {alert("Modal has been closed.")}}
          style={styles.container}
        >
          <View style={styles.container}>
            <FindAddress style={styles.container} onCalloutPress={this.onCalloutPress} addressType={this.state.addressType}/>
          </View>
        </Modal>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentLocation: () => dispatch(getCurrentLocation())
  }
}

export default connect(null, mapDispatchToProps)(Personalization)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
