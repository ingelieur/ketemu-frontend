import React from 'react'
import { AsyncStorage, View, Text, Image } from 'react-native'
import { Spinner } from 'native-base'
import { TabNavigator } from 'react-navigation'
import {connect} from 'react-redux'
import axios from 'axios'

import { UpcomingScreen, HistoryScreen, Profile } from '../containers'
import { fetchDataUser } from '../actions/userAction'
import { getAllMeetUps } from '../actions'

export const Tabs = TabNavigator({
  Upcoming: { screen : UpcomingScreen },
  History: { screen : HistoryScreen },
  Profile: { screen : Profile },
})

class LandingPage extends React.Component {
  constructor(){
    super()
    this.state = {
      loadStatus : false
    }
  }


  componentDidMount() {
    AsyncStorage.getItem('id', (err, id) => {
      console.log('dari saat abis kill',id);
      if (id) {
        this.props.fetchUser(id)
        axios.get(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/getmeetingsbyparticipant/${id}`)
          .then((meetup)=>{
            this.props.getAllMeetUps(meetup.data)
            this.setState({loadStatus:true})
          })
      }
    })
  }

  render() {
    if(this.state.loadStatus===true){
      return (
        <Tabs screenProps={{navigateApp: this.props.navigation}}/>
      )
    } else {
      return (
        <View style={{flex:1}}>
          <View style={{flex:1,backgroundColor:'#b3e0ff',justifyContent:'center',alignItems:'center'}}>
            <Image
              style={{width: 200,height:200,alignSelf:'center'}}
              source={require('../assets/Quedaricon.png')}
            />
            <Spinner />
            <Text style={{color:'white', fontWeight:'bold',fontSize:20}}>
              Loading...
            </Text>
          </View>
        </View>
      )
    }

  }
}

const mapStateToProps = state => {
  console.log('aldy state',state);
  return {
    users:state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllMeetUps: data=> {
      dispatch(getAllMeetUps(data))
    },
    fetchUser: data => {
      dispatch(fetchDataUser(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
