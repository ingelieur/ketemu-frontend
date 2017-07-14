import React from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text
} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import Maps from './Maps'

const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class FindAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markerPosition: {
        longitude: 0,
        latitude: 0,
      },
    }
  }

  onRegionChange(region, latitude, longitude) {
    this.setState({
      region: {...this.state.region, ...region},
      // If there are no new values set the current ones
      markerPosition: {...this.state.markerPosition, latitude, longitude}
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {JSON.stringify(this.state.region)}
        </Text>
        <GooglePlacesAutocomplete
          placeholder='Enter Location'
          minLength={2}
          autoFocus={false}
          fetchDetails
          listViewDisplayed='auto'
          query={{
            key: 'AIzaSyCnuZIr08cpL0ypqUlSX6ZfxZPfHWX_TrA',
            language: 'en',
            types: 'geocode',
          }}
          currentLocation={false}
          onPress={(data, details = null) => {
            const region = {
              latitude: details.geometry.location.lat || this.state.region.latitude,
              longitude: details.geometry.location.lng || this.state.region.longitude,
              latitudeDelta: this.state.region.latitudeDelta * 1.5,
              longitudeDelta: this.state.region.longitudeDelta * 1.5
            };
            this.onRegionChange(region, region.latitude, region.longitude);
          }}
        />
        <Maps region={this.state.region} markerPosition={this.state.markerPosition} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
