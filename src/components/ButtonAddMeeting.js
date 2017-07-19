import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Content, Card, CardItem, Text, Body, Button, Icon, Fab } from 'native-base'

class ButtonAddMeeting extends Component {
  render() {
    const navigate = this.props.navigateApp ? this.props.navigateApp.navigate : (() => {});
    return (
      <Fab
        containerStyle={{ }}
        style={{ backgroundColor: 'deepskyblue' }}
        position="bottomRight"
        onPress={() => navigate('CreateMeeting')}>
        <Icon name="add" />
      </Fab>
    )
  }
}

export default ButtonAddMeeting
