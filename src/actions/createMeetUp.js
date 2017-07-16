import axios from 'axios'
import { NavigationActions } from 'react-navigation'

export const createMeetUp = (obj) =>{
  return (dispatch)=>{
    axios.post('http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/createmeetup', obj.dataMeetup)
    .then((response)=>{
      // const goLandingPage = NavigationActions.reset({
      //   index: 0,
      //   actions: [
      //     NavigationActions.navigate({ routeName: 'LandingPage'})
      //   ]
      // })
      // data.navigateLogin.dispatch(goLandingPage)
      console.log('datanya', response.data);
      alert('berhasil')
    })
    .catch((error) => {
      console.log(`opps, create Meet Up: ${error}`);
    })
  }
}
