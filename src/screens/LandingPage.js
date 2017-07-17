import React from 'react'
import { AsyncStorage } from 'react-native'
import { TabNavigator } from 'react-navigation'
import {connect} from 'react-redux'

import { UpcomingScreen, HistoryScreen, Profile } from '../containers'
import { getAllMeetUps } from '../actions'

export const Tabs = TabNavigator({
  Upcoming: { screen : UpcomingScreen },
  History: { screen : HistoryScreen },
  Profile: { screen : Profile },
})

class LandingPage extends React.Component {
  componentDidMount(){
    axios.get(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/getmeetingsbyparticipant/${this.props.users.id}`)
    .then((meetup)=>{
      this.props.getAllMeetUps(meetup.data)
    })
  }
  render() {
    console.log(this.props)
    return (
      <Tabs screenProps={{navigateApp: this.props.navigation}}/>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    users:state.users
  }
}


const mapDispatchToProps = (dispatch) =>{
  return{
    getAllMeetUps:(data)=>dispatch(getAllMeetUps(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (LandingPage)
