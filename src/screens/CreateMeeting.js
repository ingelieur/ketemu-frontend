import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default class LoginRegister extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          WOW! Buat Meeting!!
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
