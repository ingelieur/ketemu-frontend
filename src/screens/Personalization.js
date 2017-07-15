import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import ImagePicker from '../containers/ImagePicker'

export default class Personalization extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImagePicker />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
