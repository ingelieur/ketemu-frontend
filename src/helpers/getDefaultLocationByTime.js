function getDefaultLocationTypeByTime (meetingDate) {
  let meetingDay = meetingDate.getDay()
  let meetingHour = meetingDate.getHours()
  if (meetingDay === 0 || meetingDay === 6) {
    return 'home'
  }
  else if (meetingHour > 8 && meetingHour < 20) {
    return 'office'
  }
  else return 'home'
}

module.exports = { getDefaultLocationTypeByTime }
