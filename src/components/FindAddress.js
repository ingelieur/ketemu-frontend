import React from 'react'
import {
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
    }
  }

  onLocationPress(latitude, longitude) {
    this.setState({
      latitude,
      longitude
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
        <GooglePlacesAutocomplete
          placeholder='Enter Location'
          minLength={2}
          autoFocus={false}
          currentLocation={false}
          fetchDetails
          listViewDisplayed='auto'
          query={{
            key: 'AIzaSyCnuZIr08cpL0ypqUlSX6ZfxZPfHWX_TrA',
            language: 'en',
            types: 'geocode',
          }}
          onPress={(data, details = null) => {
            const markerPosition = {
              latitude: details.geometry.location.lat || this.state.latitude,
              longitude: details.geometry.location.lng || this.state.longitude,
            }
            this.onLocationPress(markerPosition.latitude, markerPosition.longitude);
          }}
        />
        <Maps style={styles.map} latitude={this.state.latitude} longitude={this.state.longitude} zoom='0.2' markerTitle={`Set as ${this.props.addressType}`}/>
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
  },
})
