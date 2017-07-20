//import liraries
import React from 'react';
import {
    View,
    Button,
    Image,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity,
    Text,
} from 'react-native';

import ImagePicker from 'react-native-image-picker'

import { RNS3 } from 'react-native-aws3';

import { updateAvatarUrl } from '../actions/userAction'

import { connect } from 'react-redux'

const options = {
    title: 'Select image of your avatar',
    storageOption: {
        skipBackup: true,
        path: 'images'
    }
}

// create a component
class AvatarPicker extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            avatar: null
        }

        this.onPickImage = this.onPickImage.bind(this)
        this.onReset = this.onReset.bind(this)
    }

    onPickImage() {
        ImagePicker.showImagePicker(options, response => {
            if (!response.didCancel && !response.error) {
                const source = { uri: response.uri }
                this.setState({
                    avatar: source
                })
                AsyncStorage.getItem('user', (err, user) => {
                  AsyncStorage.getItem('id', (err, id) => {
                    const fileName = `${id}_${user}.png`
                    const file = {
                      uri: this.state.avatar.uri,
                      name: fileName,
                      type: "image/png"
                    };

                    const options = {
                      keyPrefix: 'profile_pictures/',
                      bucket: 'elasticbeanstalk-us-west-2-183031211456',
                      region: 'us-west-2',
                      accessKey: 'AKIAJI7F5NUCEVR4MCDA',
                      secretKey: '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',
                      successActionStatus: 201
                    };

                    RNS3.put(file, options).then(response => {
                      if (response.status !== 201) {
                        throw new Error('Failed to upload image to S3', response);
                      }
                      this.props.updateAvatar(response.body.postResponse.location)
                    });
                  })
                })
            }
        })
    }

    onReset() {
        this.setState({
            avatar: null
        })
    }

    renderImageView() {
        return (
            <View>
                <Image
                    style={styles.image}
                    source={this.state.avatar}
                />
                <Button
                    onPress={this.onReset}
                    title="Remove"
                    color="#841584"
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
              <TouchableOpacity
                onPress={this.onPickImage}
                style={{width:150, height:150, backgroundColor: '#FFFEEE'}}
              >
                { this.state.avatar ? (
                  <Image
                    style={styles.image}
                    source={this.state.avatar}
                  />
                ) : (
                  <Image
                    style={styles.image}
                    source={this.state.avatar ? this.state.avatar : {uri: 'https://cdn2.iconfinder.com/data/icons/rcons-user/32/male-circle-512.png'}}
                  />
                )}
              </TouchableOpacity>

              {this.state.avatar?null:<Text>You must change the profile photo.</Text>}

            </View>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFEEE',
        alignItems:'center'
    },
    image: {
        flex:1
    }
});

const mapDispatchToProps = dispatch => {
  return {
    updateAvatar: data => {
      dispatch(updateAvatarUrl(data))
    }
  }
}

//make this component available to the app
export default connect(null, mapDispatchToProps)(AvatarPicker);
