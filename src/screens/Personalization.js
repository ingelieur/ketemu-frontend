import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { connect, } from 'react-redux'

import FindAddress from '../components/FindAddress'
import { getCurrentLocation, } from '../actions'

class Personalization extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log('Personalization: cdm')
    this.props.getCurrentLocation()
  }

  render() {
    return (
      <View style={styles.container}>
        <FindAddress style={styles.container} addressType='Office'/>
        <Text>
          HOLA!
        </Text>
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
