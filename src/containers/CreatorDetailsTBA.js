import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native'

class CreatorDetailsTBA extends React.Component {
  constructor(props) {
    super(props)
  }
  setPlace() {
    this.props.navigateApp.navigate('SetPlace', {meetupId: this.props.meeting._id})
  }
  render() {
    console.log('BUTTTOOOON', this.props.navigateApp)
    return (
      <View style={styles.container}>
        <Text>THIS IS CREATOR DETAILS</Text>
        <Button
          onPress={() => this.setPlace()}
          title="Set Place"
          color="#841584"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default CreatorDetailsTBA
