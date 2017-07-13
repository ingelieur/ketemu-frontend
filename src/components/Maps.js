import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import MapView from 'react-native-maps'

export default class Maps extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      region: {
        latitude: -6.260441,
        longitude: 106.781648,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    }
  }

  /* GET CURRENT POSITION */
  /* ==================== */
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      })
    },
      (error) => this.setState({error: error.message}),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )
  }

  /* WATCH POSITION */
  /* ==================== */
  /*
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      })
    },
      (error) => this.setState({error: error.message}),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    )

    this.watchId = navigator.geolocation.watchPosition((position) => {
      this.setstate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      },
        (error) => this.setState({error: error.message}),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
      )
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
  }
  */

  render() {
    return (
      <View style={ styles.container }>
        <Text>
          {this.state.latitude}, {this.state.longitude}
        </Text>
        <MapView
          style={ styles.container }
          initialRegion={{
            latitude: this.state.latitude || -6.260441,
            longitude: this.state.longitude || 106.781648,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: this.state.latitude || -6.260441,
              longitude: this.state.longitude || 106.781648,
            }}
            title="Location"
            description="Hacktiv8" />
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
