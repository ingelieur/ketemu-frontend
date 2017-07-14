import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Button, Icon, Fab } from 'native-base';
import { connect } from 'react-redux'

class HistoryScreen extends Component {
  render() {
    return (
      <View style={styles.parentView}>
        <Container style={styles.historyData}>
          <Content>
            { this.props.meetings.map((meeting) => {
              return(
                <Card key={meeting.id}>
                  <CardItem >
                    <Body>
                      <View style={{flex:1, flexDirection:'row'}}>
                        <Icon active name="calendar" />
                        <Text style={styles.marginText}>
                          {meeting.date}
                        </Text>
                      </View>

                      <View
                        style={{
                          borderBottomWidth: 2,
                          borderBottomColor: 'black',
                          width: 370,
                          marginTop:2
                        }}
                      />

                      <View style={{flex:1, flexDirection:'row', marginTop:5}}>
                        <Text>
                          {meeting.title}
                        </Text>
                      </View>

                      <View style={{flex:1, flexDirection:'row', marginTop:5}}>
                        <Icon active name="pin" />
                        <Text style={styles.marginText}>
                          {meeting.place}
                        </Text>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              )
            }
          )}
          </Content>

          <Fab
            containerStyle={{ }}
            style={{ backgroundColor: 'deepskyblue' }}
            position="bottomRight"
            onPress={this.addMeeting}>
            <Icon name="add" />
          </Fab>

        </Container>

      </View>
    );
  }

  addMeeting(){
    alert('oke')
  }
}

const styles = {
  parentView:{
    flex:1,
  },
  historyData:{
    flex:1
  },
  createMeetUpView:{
    flex:0.07,
    flexDirection:'column',
    alignItems:'center',
    justifyContent: 'center',
  },
  marginText:{
    paddingTop:2,
    paddingLeft:8
  }
};

const mapStateToProps = (state)=>{
  return{
    meetings:state.meetings
  }
}

export default connect(mapStateToProps, null) (HistoryScreen)
