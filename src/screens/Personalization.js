import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import Maps from '../components/Maps'

export default class Personalization extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Maps />
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
