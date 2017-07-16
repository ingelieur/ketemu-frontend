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
                // console.log('URL IMAGE: ', this.state.avatar)
                AsyncStorage.getItem('user', (err, user) => {
                  AsyncStorage.getItem('id', (err, id) => {
                    // console.log(`USER IMAGE PICKER: ${id}_${user}`)
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
                      // console.log('|||||||||||: ', response)
                      if (response.status !== 201) {
                        throw new Error('Failed to upload image to S3', response);
                      }
                      // console.log('*** BODY ***', response.body);
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
                style={{width:150, height:150, backgroundColor: 'red'}}
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
              <Text >Change Profile Photo</Text>

            </View>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: 'white',
    },
    image: {
        flex:1
    }
});

const mapStateToProps = state => {
  console.log('ImagePicker: ***', state)
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateAvatar: data => {
      dispatch(updateAvatarUrl(data))
    }
  }
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(AvatarPicker);