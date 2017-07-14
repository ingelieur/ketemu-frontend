import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default class Personalization extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          PERSONALIZATION U YEAH!!
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
