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
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    setInterval(this.props.getCurrentLocation(), 100000)
  }

  render() {
    return (
      <Maps latitude={this.props.position.latitude} longitude={this.props.position.longitude} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    position: state.position,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentLocation: () => dispatch(getCurrentLocation())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackingPosition)
