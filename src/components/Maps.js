import React from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
} from 'react-native'
//import MapView from 'react-native-maps'
import { connect, } from 'react-redux'

import { getCurrentLocation, } from '../actions'

//const {width, height} = Dimensions.get('window')
//const ASPECT_RATIO = width / height
//const LATITUDE_DELTA = 0.0922
//const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class Maps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: this.props.positions.latitude,
      longitude: this.props.positions.longitude,
    }
    this.addLatLng = this.addLatLng.bind(this)
    //this.state = {
    //  region: {
    //    latitude: 0,
    //    longitude: 0,
    //    latitudeDelta: LATITUDE_DELTA,
    //    longitudeDelta: LONGITUDE_DELTA,
    //  },
    //  markerPosition: {
    //    latitude: 0,
    //    longitude: 0,
    //  }
    //}
  }

  componentDidMount() {
    setInterval(this.addLatLng, 100000)
  }

  //componentWillReceiveProps(nextProps) {
	//console.log(`nexxxt props ${nextProps.latitude}`)
  //}

  addLatLng() {
    //console.log(this.state)
    this.setState({
      latitude: this.state.latitude + 0.1,
      longitude: this.state.longitude + 0.1,
    })
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      let latlng = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
      }
      this.setState({
        region: {...this.state.region, ...latlng},
        markerPosition: {...latlng},
      })
    },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000})
  }

  //watchID: ?number = null

  //componentDidMount() {

  //this.watchID = navigator.geolocation.watchPosition(position => {
  //  let latlng = {
  //    latitude: parseFloat(position.coords.latitude),
  //    longitude: parseFloat(position.coords.longitude),
  //  }

  //  this.setState({
  //    region: {...this.state.region, ...latlng},
  //    markerPosition: {...this.state.markerPosition, ...latlng}
  //  })
  //})
  //}

  //componentWillUnmount() {
  //  navigator.geolocation.clearWatch(this.watchID)
  //}

  //render() {
  //  return (
  //    <View style={styles.container}>
  //      <Text>
  //        {JSON.stringify(this.state.markerPosition)}
  //      </Text>
  //      <MapView
  //        style = {styles.container}
  //        region={ this.state.region.latitude!==0 && this.state.region.longitude!==0 ? this.state.region : this.state.region}>
  //        <MapView.Marker
  //          coordinate={this.state.markerPosition.latitude!==0 && this.state.markerPosition.longitude!==0 ? this.state.markerPosition : this.state.markerPosition}
  //          title="You are here"
  //        />
  //      </MapView>
  //    </View>
  //  )
  //}
  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Text>
          INI MAPS LOH! BENERAN!
          Latitude: {this.state.latitude}
          Longitude: {this.state.longitude}
        </Text>
      </View>
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
    getCurrentLocation: () => dispatch(getCurrentLocation()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maps)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
