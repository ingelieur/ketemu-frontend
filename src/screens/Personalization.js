import React from 'react'

import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import { connect } from 'react-redux'

import FindAddress from '../components/FindAddress'

import { getCurrentLocation, } from '../actions'

import { ImagePicker, FormPersonalization } from '../containers'

class Personalization extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCurrentLocation()
  }

  render() {
    return (
      <View style={styles.parentView}>
        <ImagePicker style={styles.imagePickerView} />
        <FormPersonalization style={styles.formPersonalizationView} />
      </View>
    )
  }

  //render() {
  //  return (
  //    <View style={styles.container}>
  //      <FindAddress style={styles.container} addressType='Office'/>
  //      <Text>
  //        HOLA!
  //      </Text>
  //    </View>
  //  )
  //}

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

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentLocation: () => dispatch(getCurrentLocation())
  }
}

export default connect(null, mapDispatchToProps)(Personalization)