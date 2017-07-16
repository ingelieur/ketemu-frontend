import React from 'react'

import { View, Text } from 'react-native'

const Line = () => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#BFBFBF',
          width: 320,
          marginTop:2
        }}
      />
    </View>
  )
}

export default Line