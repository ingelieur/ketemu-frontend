import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import Pie from '../components/PieChart'
import data from '../data/data'
import Theme from '../theme'

class TempatPie extends React.Component {
  render() {
    const height = 200;
    const width = 500;
    return (
      <View style={styles.container}>
        <Text>Tempat Pie</Text>
        <Pie
          pieWidth={150}
          pieHeight={150}
          colors={Theme.colors}
          width={width}
          height={height}
          data={data.spendingsLastMonth}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'whitesmoke',
    marginTop: 21,
  }
})

export default TempatPie
