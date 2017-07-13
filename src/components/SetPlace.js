import React, {Component} from 'react'
import { View, Text} from 'react-native'

import MapView from 'react-native-maps';

class SetPlace extends Component {
  constructor(){
    super()
    this.state = {
      centerCoordinate:'a',
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.state.centerCoordinate?(
          <View style={{flex:1}}>
            <Text style={{flex:1}}>
              Change type! {this.state.centerCoordinate}
            </Text>
            <Text style={{flex:1}}>
              lat: {this.state.region.latitude}
            </Text>
          </View>
        ):null}
        <MapView
          style={{flex:7}}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
      </View>
    );
  }
}

export default SetPlace
