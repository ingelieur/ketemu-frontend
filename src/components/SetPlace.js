import React, {Component} from 'react'
import { View, Text} from 'react-native'
import axios from 'axios'

import MapView from 'react-native-maps';

class SetPlace extends Component {
  constructor(){
    super()
    this.state = {
      centerCoordinate:'a',
      region: {
        latitude: -6.1751,
        longitude: 106.8650,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      markers:[]
    }
    this.onRegionChange = this.onRegionChange.bind(this)
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  componentWillMount(){
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.region.latitude},${this.state.region.longitude}&radius=500&key=AIzaSyCnuZIr08cpL0ypqUlSX6ZfxZPfHWX_TrA`)
    .then(response=>{
      this.setState({'markers':response.data.results})
      console.log(response);
    })
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.state.centerCoordinate?(
          <View style={{flex:1}}>
            <View style={{flex:1,flexDirection:'row'}}>
              <Text style={{flex:1}}>
                Change type! {this.state.centerCoordinate}
              </Text>
              <Text style={{flex:1}}>
                lat: {this.state.region.latitude}
              </Text>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
              <Text style={{flex:1}}>
                lat: {this.state.region.latitude}
              </Text>
              <Text style={{flex:1}}>
                lng: {this.state.region.longitude}
              </Text>
              <Text style={{flex:1}}>
                latD: {this.state.region.latitudeDelta}
              </Text>
              <Text style={{flex:1}}>
                lngD: {this.state.region.longitudeDelta}
              </Text>
            </View>
          </View>
        ):null}
        <MapView
          style={{flex:7}}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
        {this.state.markers.map((marker,index) => (
          <MapView.Marker
            key={index}
            coordinate={{latitude:marker.geometry.location.lat,longitude:marker.geometry.location.lng}}
            title={marker.name}
            description={marker.vicinity}
          />
        ))}
        </MapView>
      </View>
    );
  }
}

export default SetPlace
