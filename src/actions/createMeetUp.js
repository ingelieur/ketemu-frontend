import axios from 'axios'
import { NavigationActions } from 'react-navigation'

export const inputParticipantsMeetUp = (arr) =>{
  return {
    type: 'INPUT_PARTICIPANTS_MEETUP',
    payload: arr,
  }
}

export const createMeetUp = (obj) =>{
  return (dispatch)=>{
    axios.post('http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/createmeetup', obj.dataMeetup)
    .then((response)=>{
      const goLandingPage = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'LandingPage'})
        ]
      })
      dispatch({
        type: 'INPUT_SUKSES',
      })
      obj.navigateApp.dispatch(goLandingPage)
    })
    .catch((error) => {
    })
  }
}
