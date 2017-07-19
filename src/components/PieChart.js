import React from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native'
import {PieChart} from 'react-native-mp-android-chart'

export default function PieChartComp(props) {
  let participantsYes = props.participants.filter((participant) => {
    if(participant.status === 'yes') return participant
  })
  let participantsNo = props.participants.filter((participant) => {
    if(participant.status === 'no') return participant
  })
  let participantsPending = props.participants.filter((participant) => {
    if(participant.status === 'pending') return participant
  })
  let state = {
    legend: {
      enabled: true,
      textSize: 10,
      form: 'CIRCLE',
      position: 'RIGHT_OF_CHART',
      fontFamily: 'monospace',
      wordWrapEnabled: true
    },
    data: {
      datasets: [{
        yValues: [participantsYes.length, participantsPending.length, participantsNo.length],
        label: '',
        config: {
          colors: ['#C0FF8C', '#FFF78C', '#FF8C9D'],
          sliceSpace: 3,
          selectionShift: 5
        }
      }],
      xValues: ['Yes', 'Pending', '']
    },
    description: {
      text: '',
      textSize: 15,
      textColor: 'darkgray',
      fontFamily: 'monospace',
      fontStyle: 2
    }
  }

  const pressMe = () => {
    alert('OI')
  }

  return (
    <View style={styles.container}>
      <PieChart
        style={styles.chart}
        logEnabled={true}
        backgroundColor={'#f0f0f0'}
        description={state.description}
        data={state.data}
        legend={state.legend}
        drawSliceText={false}
        usePercentValues={false}
        centerText={'Participants'}
        centerTextRadiusPercent={100}
        holeRadius={40}
        holeColor={'#f0f0f0'}
        transparentCircleRadius={45}
        transparentCircleColor={'#f0f0f0'}
        transparentCircleAlpha={50}
        maxAngle={360}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    flex: 1
  }
})
