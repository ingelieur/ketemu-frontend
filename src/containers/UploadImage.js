//import liraries
import React from 'react';
import {
    View,
    Button,
    Image,
    ActivityIndicator,
    StyleSheet,
    CameraRoll,
    Dimensions
} from 'react-native';

import Camera from 'react-native-camera';

import { RNS3 } from 'react-native-aws3';

// create a component
class UploadImage extends React.Component {
    constructor(props) {
        super(props)

        this.takePicture = this.takePicture.bind(this);

    }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        const file = {
          uri: data.path,
          name: "image.png",
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
          console.log('|||||||||||: ', response)
          if (response.status !== 201) {
            throw new Error('Failed to upload image to S3', response);
          }
          console.log('*** BODY ***', response.body);

          /**
           * {
           *   postResponse: {
           *     bucket: "your-bucket",
           *     etag : "9f620878e06d28774406017480a59fd4",
           *     key: "uploads/image.png",
           *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
           *   }
           * }
          */

        });
      })
      .catch(err => console.error(err));
  }

    render() {
        return (
            <View style={styles.container}>
              <Camera
                ref={(cam) => {
                  this.camera = cam;
                }}
                style={styles.cameraContainer}
                aspect={Camera.constants.Aspect.fill}
                captureAudio={false}
              />
              <Button
                name="android-camera-outline"
                size={60}
                style={{ justifyContent: 'center' }}
                onPress={this.takePicture}
                title="Select your avatar"
                color="#841584"
              />
            </View>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width
  },
  cameraContainer: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
    backgroundColor: 'salmon'
  }
})

//make this component available to the app
export default UploadImage;