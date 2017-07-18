import React from 'react'
import { AsyncStorage } from 'react-native'
import { TabNavigator } from 'react-navigation'
import {connect} from 'react-redux'

import { UpcomingScreen, HistoryScreen, Profile } from '../containers'
import axios from 'axios'

export const Tabs = TabNavigator({
  Upcoming: { screen : UpcomingScreen },
  History: { screen : HistoryScreen },
  Profile: { screen : Profile },
})

import { connect } from 'react-redux'

import { fetchDataUser } from '../actions/userAction'

class LandingPage extends React.Component {

  componentDidMount() {

    AsyncStorage.getItem('id', (err, id) => {
      if (id) {
        this.props.fetchUser(id)
      }
    })
  }

  render() {
    return (
      <Tabs screenProps={{navigateApp: this.props.navigation}}/>
    )
  }
}

const mapStateToProps = (state) => {
    console.log('ini state saat landingpage', state)
    return {
      id: state.users.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: data => {
            dispatch(fetchDataUser(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)