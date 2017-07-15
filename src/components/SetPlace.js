import React, {Component} from 'react'
import { View, Text, Button} from 'react-native'
import axios from 'axios'
import geolib from 'geolib'
import outliers from 'outliers'

import MapView from 'react-native-maps';

class SetPlace extends Component {
  constructor(){
    super()
    this.state = {
      meetupId:'596a45fa6ce69d356f3a3264',
      region: {
        latitude: -6.2656832,
        longitude: 106.7810439,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      markers:[],
      radius:500,
      venueType:'warung'
    }
    this.onRegionChange = this.onRegionChange.bind(this)
    this.getCenter = this.getCenter.bind(this)
    this.getVenue = this.getVenue.bind(this)
    this.regionAdjustment = this.regionAdjustment.bind(this)
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  getCenter(coordinates){
    var geoArray = coordinates.map(a=>( {'latitude':a[0],'longitude':a[1]} ))

    var centerCoordinate = geolib.getCenter(geoArray);

    var distanceArray = coordinates.map(a=> geolib.getDistance({latitude: a[0], longitude: a[1]},centerCoordinate) )

    var OutliersDistanceArray=outliers(distanceArray)

    var OutlierIndex = []
    distanceArray.forEach((val,index)=>{
      OutliersDistanceArray.forEach((a)=>{
        if(a==val){
          OutlierIndex.push(index)
        }
      })
    })

    var newGeoArray = []
    geoArray.forEach((val,index)=>{
      OutlierIndex.forEach((a)=>{
        if(a!=index){
          newGeoArray.push(val)
        }
      })
    })

    if(newGeoArray.length>0){
      this.setState({
        region:{
          latitude: parseFloat(geolib.getCenter(newGeoArray).latitude),
          longitude: parseFloat(geolib.getCenter(newGeoArray).longitude),
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }
      })
      this.getVenue()
    } else {
      this.setState({
        region:{
          latitude: parseFloat(geolib.getCenter(geoArray).latitude),
          longitude: parseFloat(geolib.getCenter(geoArray).longitude),
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }
      })
      this.getVenue()
    }
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
    axios.get(`http://dev-env.gtgwzsbszw.us-west-2.elasticbeanstalk.com/detailmeetup/${this.state.meetupId}`)
    .then(response=>{
      this.setState({'venueType':response.data.results.typePlaces})
      let coordinates = [response.data.results.creator.officeAddressGeolocation]
      response.data.results.participants.forEach(participant=>{
        coordinates.push(participant.user.officeAddressGeolocation)
      })
      // let coordinates = [
      //   [-6.354285,106.713924],
      //   [-6.2607187,106.7816162],
      //   [-6.3705916,106.8406042],
      //   // [-6.393757,107.435728],
      //   [-6.922998,107.622495]
      // ]
      this.getCenter(coordinates)
    })
    .catch(err=>{
      let coordinates = [
        [-6.354285,106.713924],
        [-6.2607187,106.7816162],
        [-6.3705916,106.8406042],
        [-6.393757,107.435728],
        [-6.922998,107.622495]
      ]
      this.getCenter(coordinates)
    })
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
