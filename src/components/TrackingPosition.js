import React from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { connect, } from 'react-redux'

import Maps from './Maps'
import { getCurrentLocation, } from '../actions'

class TrackingPosition extends React.Component {

  com
  render () {
    return (
      <Maps />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    positions: state.positions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentLocation: () => dispatch(getCurrentLocation())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackingPosition)

const style = StyleSheet.create({
  container: {
    flex: 1,
  }
})
