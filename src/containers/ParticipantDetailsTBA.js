import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import Axios from 'axios'

import PieChart from '../components/PieChart'

class ParticipantDetailsTBA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleRSVP = (decision) => {
    Axios.put(`http://otw-env.cjqaqzzhwf.us-west-2.elasticbeanstalk.com/confirmattendance/${this.props.meetingId}`, {id: this.props.users.id, status: decision})
      .then ((response) => {
        this.setState({
          RSVP: decision,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<PieChart style={{flex: 1}}/>*/}
        <Text>PIEChart</Text>
        <Text>{`\n`}</Text>
        <Text>Time</Text>
        <Text>Place: TBA </Text>
        <Text>{`\n`}</Text>
        <Text>So, are you coming? </Text>
        <Text>{JSON.stringify(this.props.meeting)}</Text>
        {/*<Text onPress={() => this.handleRSVP('yes')} style={this.state.RSVP === 'yes' ? {fontWeight: 'bold'} : {}}>Yes</Text>
        <Text onPress={() => this.handleRSVP('no')} >No</Text>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default ParticipantDetailsTBA
