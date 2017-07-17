import React from 'react'

import {
  StyleSheet,
  View,
  Text,
  Modal,
} from 'react-native'

import { connect } from 'react-redux'

import FindAddress from '../components/FindAddress'

import { getCurrentLocation, } from '../actions'

import { ImagePicker, FormPersonalization } from '../containers'

class Personalization extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     isModal: false,
  //     addressType: '',
  //     homeAddressName: '',
  //     homeAddressGeolocation:[],
  //     officeAddressName: '',
  //     officeAddressGeolocation:[],
  //   }
  // }

  // componentWillMount() {
  //   this.props.getCurrentLocation()
  // }

  // onCalloutPress = (results) => {
  //   this.setState({
  //     isModal: false,
  //     [`${results.type}AddressName`]: results.placeName,
  //     [`${results.type}AddressGeolocation`]: [results.latitude, results.longitude],
  //   }, () => {
  //     console.log(this.state)
  //   })
  // }

  // handleAddressForm = (addressType) => {
  //   this.setState({
  //     isModal: true,
  //     addressType,
  //   })
  // }

  render() {
    // console.log('NAVIGATWWWWW: ', this.props)
    return (
      <View style={styles.parentView}>
        <ImagePicker style={styles.imagePickerView} />
        <FormPersonalization style={styles.formPersonalizationView} navigateApp={this.props.navigation}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
  },
  imagePickerView: {
    flex: 1,
  },
  formPersonalizationView: {
    flex: 4,
  }
})

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getCurrentLocation: () => dispatch(getCurrentLocation())
//   }
// }

export default Personalization
