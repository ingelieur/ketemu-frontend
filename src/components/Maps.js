import React from 'react'
import {
  Dimensions,
  StyleSheet,
} from 'react-native'
import MapView from 'react-native-maps'

export default function Maps(props) {
  const {width, height} = Dimensions.get('window')
  const ASPECT_RATIO = width / height
  const LATITUDE_DELTA = 0.0922
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
  let region = {
    latitude: props.latitude,
    longitude: props.longitude,
    latitudeDelta: props.zoom ? LATITUDE_DELTA*props.zoom : LATITUDE_DELTA,
    longitudeDelta: props.zoom ? LONGITUDE_DELTA*props.zoom : LONGITUDE_DELTA,
  }
  let markerPosition = {
    latitude: props.latitude,
    longitude: props.longitude,
  }
  let myMarker = null
  return (
    <MapView
      style={styles.container}
      region={region}
      onRegionChangeComplete={() => myMarker.showCallout()}
      onCalloutPress={() => alert(`Hi! I'm clickable!`)}
    >
      <MapView.Marker
        coordinate={markerPosition}
        ref={ref => {myMarker = ref}}
        title={props.markerTitle || 'You are here'}
      />
    </MapView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
