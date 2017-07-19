import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Modal,
} from 'react-native'

import { ImagePicker, FormPersonalization } from '../containers'

class Personalization extends React.Component {
  render() {
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

export default Personalization
