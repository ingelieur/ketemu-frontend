import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import TrackingPosition from '../components/TrackingPosition'

export default class Personalization extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TrackingPosition/>
        <Text>
          HOLA!
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
