import React, {Component} from 'react'
import { connect } from 'react-redux'
import moment from 'moment-business-time'

class AddressAroundMeeting extends React.Component {
  constructor() {
    super()
    this.state = {
      defaultType: ''
    }
  }

  homeOrOffice = (meetingTime) => {
    let bussinessHour = moment(meetingTime).isWorkingTime()
    if(bussinessHour){
      this.setState({
        defaultType: 'office'
      })
    } else {
      this.setState({
        defaultType: 'home'
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    createMeetUp: state.createMeetUp,
  }
}

export default connect(mapStateToProps, null)(AddressAroundMeeting)
