import React from 'react'
import { AsyncStorage } from 'react-native'
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

  componentDidMount() {
    AsyncStorage.getItem('id', (err, id) => {
      if (id) {
        this.props.fetchUser(id)
        axios.get(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/getmeetingsbyparticipant/${id}`)
          .then((meetup)=>{
            this.props.getAllMeetUps(meetup.data)
          })
      }
    })
  }

  render() {
    return (
      <Tabs screenProps={{navigateApp: this.props.navigation}}/>
    )
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

export default connect(null, mapDispatchToProps)(LandingPage)
