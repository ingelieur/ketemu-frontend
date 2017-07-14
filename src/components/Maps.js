import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
//import MapView from 'react-native-maps'

//const {width, height} = Dimensions.get('window')
//const ASPECT_RATIO = width / height
//const LATITUDE_DELTA = 0.0922
//const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class Maps extends React.Component {
  constructor(props) {
    super(props)
  }

    /*
  watchID: ?number = null

  componentDidMount() {
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

    this.watchID = navigator.geolocation.watchPosition(position => {
      let latlng = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
      }

      this.setState({
        region: {...this.state.region, ...latlng},
        markerPosition: {...this.state.markerPosition, ...latlng}
      })
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }
  */
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
    return (
      <View style={styles.container}>
        <Text>
          INI MAPS LOH! BENERAN!
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
