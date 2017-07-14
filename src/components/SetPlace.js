import React, {Component} from 'react'
import { View, Text, Button} from 'react-native'
import axios from 'axios'

import MapView from 'react-native-maps';

class SetPlace extends Component {
  constructor(){
    super()
    this.state = {
      region: {
        latitude: -6.2656832,
        longitude: 106.7810439,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      markers:[],
      radius:500,
      venueType:'coffee+shop'
    }
    this.onRegionChange = this.onRegionChange.bind(this)
    this.getVenue = this.getVenue.bind(this)
    this.regionAdjustment = this.regionAdjustment.bind(this)
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  getVenue(){
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.region.latitude},${this.state.region.longitude}&radius=${this.state.radius}&keyword=${this.state.venueType}&key=AIzaSyCnuZIr08cpL0ypqUlSX6ZfxZPfHWX_TrA`)
    .then(response=>{
      this.setState({'markers':response.data.results.slice(0,10)})
      if(this.state.markers.length<10){
        this.setState({'radius':this.state.radius+=500})
        if(this.state.radius<2500){
          return this.getVenue()
        }
      }
      if(this.state.markers.length>0){
        this.regionAdjustment()
      }
    })
  }

  regionAdjustment(){
    var minX = this.state.markers[0].geometry.location.lat
    var maxX = this.state.markers[0].geometry.location.lat
    var minY = this.state.markers[0].geometry.location.lng
    var maxY = this.state.markers[0].geometry.location.lng
    this.state.markers.map((marker) => {
      minX = Math.min(minX, marker.geometry.location.lat-0.0025);
      maxX = Math.max(maxX, marker.geometry.location.lat+0.0025);
      minY = Math.min(minY, marker.geometry.location.lng-0.0025);
      maxY = Math.max(maxY, marker.geometry.location.lng+0.0025);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);

    this.setState({
      region:{
        latitude: midX,
        longitude: midY,
        latitudeDelta: deltaX,
        longitudeDelta: deltaY
      }
    });
  }

  componentWillMount(){
    this.getVenue()
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1,backgroundColor:'blue',justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:'white', fontWeight:'bold',fontSize:20}}>
            Create Meetup
          </Text>
        </View>
        <View style={{flex:10}}>
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
          {this.state.markers.length==0?(
            <Button
              onPress={()=>{}}
              title="No place found, click here to select other type of place"
              color="#841584"
              accessibilityLabel="select other type of place"
              style={{flex:2}}
            />
          ):null}
          {/*this.state.markers.length!==0?(
            <View style={{flex:1}}>
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={{flex:1}}>
                  radius: {this.state.radius}
                </Text>
                <Text style={{flex:1}}>
                  places: {this.state.markers.length}
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
          ):null*/}
        </View>
      </View>
    );
  }
}

export default SetPlace
