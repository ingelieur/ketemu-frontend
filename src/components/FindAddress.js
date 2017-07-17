import React from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { connect, } from 'react-redux'

import Maps from './Maps'

class FindAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: this.props.position.latitude,
      longitude: this.props.position.longitude,
      placeName: '',
    }
  }

  onLocationPress(latitude, longitude, placeName) {
    this.setState({
      latitude,
      longitude,
      placeName,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      latitude: nextProps.position.latitude,
      longitude: nextProps.position.longitude,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Maps
          style={styles.map}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          zoom='0.1'
          markerTitle={this.props.addressType}
          markerDesc={this.state.placeName}
          onCalloutPress={() => {this.props.onCalloutPress(this.state.placeName.length > 0 ? {...this.state, type: this.props.addressType} : null)}}/>
        <View style={styles.search}>
          <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={2}
            autoFocus={false}
            currentLocation={false}
            fetchDetails
            listViewDisplayed='auto'
            query={{
              key: 'AIzaSyBSqtoH3yauB9VCrI0o3GOuNTpvwbixyic',
              language: 'en',
              types: [ "address", "geocode", "establishment" ],
            }}
            onPress={(data, details = null) => {
              console.log('placeName: ', details.name)
              const markerPosition = {
                latitude: details.geometry.location.lat || this.state.latitude,
                longitude: details.geometry.location.lng || this.state.longitude,
              }
              const placeName = details.name
              this.onLocationPress(markerPosition.latitude, markerPosition.longitude, placeName);
            }}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    position: state.position,
  }
}

export default connect(mapStateToProps, null)(FindAddress)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  search: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
})
