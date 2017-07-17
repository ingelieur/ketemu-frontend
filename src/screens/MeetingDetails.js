import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { connect } from 'react-redux'

import ParticipantDetailsTBA from '../containers/ParticipantDetailsTBA'

class MeetingDetails extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props.users)
    //let meeting = this.props.meetings.find((meeting) => {
    let meeting = meetings.find((meeting) => {
      return meeting._id === "596b7ca200d456232b86580e"
    })
    this.state = {
      meeting: meeting,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ParticipantDetailsTBA meeting={this.state.meeting}/>
        <Text>
          The devil is in the details
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

const mapStateToProps = (state) => {
  return {
    meetings: state.meetings,
    users: state.users,
  }
}

export default connect(mapStateToProps, null)(MeetingDetails)

let meetings = [
  {
    "_id": "596b6f8420cfac2781f312a7",
    "title": "Rapat Paripurna",
    "description": "Rapat untuk membahas kutu loncat",
    "meetingTime": "2017-07-01T14:44:00.000Z",
    "confirmationTime": "2017-03-03T14:44:00.000Z",
    "typePlaces": "restaurant",
    "placeAddressName": "Ramen Chef",
    "creator": {
      "_id": "59676f5f9eb3366f547d6eba",
      "name": "Uci Arahito",
      "password": "$2a$10$m4On/2ZlegF2ogRWggK.I.9n4tl0EWfzZkqbeMQt79.mhXMVp7.Hu",
      "email": "arahitolubis@gmail.com",
      "__v": 0,
      "updatedDate": "2017-07-15T17:23:51.712Z",
      "createdDate": "2017-07-13T12:58:16.682Z",
      "officeAddressGeolocation": [
        -6.354285,
        106.713924
      ],
      "officeAddressName": "Jalan QRST",
      "homeAddressGeolocation": [
        -6.354285,
        106.713924
      ],
      "homeAddressName": "Jalan ABCD",
      "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F59676f5f9eb3366f547d6eba_arahito.png",
      "username": "arahito"
    },
    "__v": 1,
    "updatedDate": "2017-07-16T13:46:09.488Z",
    "createdDate": "2017-07-16T13:46:09.488Z",
    "location15": [],
    "location30": [],
    "location60": [],
    "status": "upcoming",
    "participants": [
      null,
      null,
      null
    ],
    "placeAddressGeolocation": [
      -6.324059399999999,
      106.7843229
    ]
  },
  {
    "_id": "596b7ca200d456232b86580e",
    "title": "OTW Ketemu",
    "description": "Ketemu coy",
    "meetingTime": "2017-07-01T14:44:00.000Z",
    "confirmationTime": "2017-03-03T14:44:00.000Z",
    "typePlaces": "cafe",
    "creator": {
      "_id": "596772300a384171ee3d8be6",
      "name": "Butet Sinaga",
      "password": "$2a$10$LFDiDsqIcvspn92lCR0Nmu6pBg798.zX.rFIJamao.rR6DyDUHuk6",
      "email": "butetbatak26@gmail.com",
      "__v": 0,
      "updatedDate": "2017-07-17T09:02:46.612Z",
      "createdDate": "2017-07-13T13:14:19.626Z",
      "officeAddressGeolocation": [
        -6.2607187,
        106.7816162
      ],
      "officeAddressName": "Jalan UVWX",
      "homeAddressGeolocation": [
        -6.2607187,
        106.7816162
      ],
      "homeAddressName": "Jalan EFGH",
      "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F596772300a384171ee3d8be6_butet.png",
      "username": "butet"
    },
    "__v": 0,
    "placeAddressName": null,
    "updatedDate": "2017-07-16T13:57:54.767Z",
    "createdDate": "2017-07-16T13:57:54.767Z",
    "location15": [],
    "location30": [],
    "location60": [],
    "status": "TBA",
    "participants": [
      {
        "user": {
          "_id": "596772300a384171ee3d8be6",
          "name": "Butet Sinaga",
          "password": "$2a$10$LFDiDsqIcvspn92lCR0Nmu6pBg798.zX.rFIJamao.rR6DyDUHuk6",
          "email": "butetbatak26@gmail.com",
          "__v": 0,
          "updatedDate": "2017-07-17T09:02:46.612Z",
          "createdDate": "2017-07-13T13:14:19.626Z",
          "officeAddressGeolocation": [
            -6.2607187,
            106.7816162
          ],
          "officeAddressName": "Jalan UVWX",
          "homeAddressGeolocation": [
            -6.2607187,
            106.7816162
          ],
          "homeAddressName": "Jalan EFGH",
          "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F596772300a384171ee3d8be6_butet.png",
          "username": "butet"
        },
        "_id": "596b7ca200d456232b865811",
        "status": "yes"
      },
      {
        "user": {
          "_id": "5968dd5d99bb522becfc3957",
          "name": "aldy andika",
          "password": "$2a$10$6wqg3xWb.iYXIKstGKFhDeOElSN3qr4TgRoacm7IaOV30uvBbBJTO",
          "email": "aldyandika@gmail.com",
          "__v": 0,
          "updatedDate": "2017-07-16T08:17:09.227Z",
          "createdDate": "2017-07-14T11:20:09.884Z",
          "officeAddressGeolocation": [
            -6.3705916,
            106.8406042
          ],
          "officeAddressName": "Jalan YZAB",
          "homeAddressGeolocation": [
            -6.3705916,
            106.8406042
          ],
          "homeAddressName": "Jalan IJKL",
          "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F5968dd5d99bb522becfc3957_andika.png",
          "username": "andika"
        },
        "_id": "596b7ca200d456232b865810",
        "status": "pending"
      },
      {
        "user": {
          "_id": "59695b5d99bb522becfc3958",
          "name": "shabrina inmas",
          "password": "$2a$10$aLwUMoCWMXVgN9JUZ0AIOe8Kaz2swvgJ9jthEtwaCpZNb8j/.caYu",
          "email": "ingelieur@gmail.com ",
          "__v": 0,
          "updatedDate": "2017-07-15T17:51:29.350Z",
          "createdDate": "2017-07-14T11:20:09.884Z",
          "officeAddressGeolocation": [
            -6.922998,
            107.622495
          ],
          "officeAddressName": "Jalan CDEF",
          "homeAddressGeolocation": [
            -6.922998,
            107.622495
          ],
          "homeAddressName": "Jalan MNOP",
          "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F59695b5d99bb522becfc3958_esviai.png",
          "username": "esviai"
        },
        "_id": "596b7ca200d456232b86580f",
        "status": "pending"
      }
    ],
    "placeAddressGeolocation": []
  },
  {
    "_id": "596c57d954bed30dcc5ac163",
    "title": "oscar",
    "description": "ganteng",
    "meetingTime": "2017-07-31T06:22:00.000Z",
    "confirmationTime": "2017-07-21T06:22:00.000Z",
    "typePlaces": "shopping_mall",
    "creator": {
      "_id": "596772300a384171ee3d8be6",
      "name": "Butet Sinaga",
      "password": "$2a$10$LFDiDsqIcvspn92lCR0Nmu6pBg798.zX.rFIJamao.rR6DyDUHuk6",
      "email": "butetbatak26@gmail.com",
      "__v": 0,
      "updatedDate": "2017-07-17T09:02:46.612Z",
      "createdDate": "2017-07-13T13:14:19.626Z",
      "officeAddressGeolocation": [
        -6.2607187,
        106.7816162
      ],
      "officeAddressName": "Jalan UVWX",
      "homeAddressGeolocation": [
        -6.2607187,
        106.7816162
      ],
      "homeAddressName": "Jalan EFGH",
      "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F596772300a384171ee3d8be6_butet.png",
      "username": "butet"
    },
    "__v": 0,
    "updatedDate": "2017-07-17T03:37:19.365Z",
    "createdDate": "2017-07-17T03:37:19.365Z",
    "location15": [],
    "location30": [],
    "location60": [],
    "status": "TBA",
    "participants": [
      {
        "user": {
          "_id": "5968dd5d99bb522becfc3957",
          "name": "aldy andika",
          "password": "$2a$10$6wqg3xWb.iYXIKstGKFhDeOElSN3qr4TgRoacm7IaOV30uvBbBJTO",
          "email": "aldyandika@gmail.com",
          "__v": 0,
          "updatedDate": "2017-07-16T08:17:09.227Z",
          "createdDate": "2017-07-14T11:20:09.884Z",
          "officeAddressGeolocation": [
            -6.3705916,
            106.8406042
          ],
          "officeAddressName": "Jalan YZAB",
          "homeAddressGeolocation": [
            -6.3705916,
            106.8406042
          ],
          "homeAddressName": "Jalan IJKL",
          "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F5968dd5d99bb522becfc3957_andika.png",
          "username": "andika"
        },
        "_id": "596c57d954bed30dcc5ac164",
        "status": "pending"
      }
    ],
    "placeAddressGeolocation": []
  },
  {
    "_id": "596c5ba554bed30dcc5ac165",
    "title": "oscar",
    "description": "ganteng",
    "meetingTime": "2017-07-31T06:38:00.000Z",
    "confirmationTime": "2017-07-26T06:38:00.000Z",
    "typePlaces": "cafe",
    "creator": {
      "_id": "596772300a384171ee3d8be6",
      "name": "Butet Sinaga",
      "password": "$2a$10$LFDiDsqIcvspn92lCR0Nmu6pBg798.zX.rFIJamao.rR6DyDUHuk6",
      "email": "butetbatak26@gmail.com",
      "__v": 0,
      "updatedDate": "2017-07-17T09:02:46.612Z",
      "createdDate": "2017-07-13T13:14:19.626Z",
      "officeAddressGeolocation": [
        -6.2607187,
        106.7816162
      ],
      "officeAddressName": "Jalan UVWX",
      "homeAddressGeolocation": [
        -6.2607187,
        106.7816162
      ],
      "homeAddressName": "Jalan EFGH",
      "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F596772300a384171ee3d8be6_butet.png",
      "username": "butet"
    },
    "__v": 0,
    "updatedDate": "2017-07-17T03:37:19.365Z",
    "createdDate": "2017-07-17T03:37:19.365Z",
    "location15": [],
    "location30": [],
    "location60": [],
    "status": "TBA",
    "participants": [
      {
        "user": {
          "_id": "5968dd5d99bb522becfc3957",
          "name": "aldy andika",
          "password": "$2a$10$6wqg3xWb.iYXIKstGKFhDeOElSN3qr4TgRoacm7IaOV30uvBbBJTO",
          "email": "aldyandika@gmail.com",
          "__v": 0,
          "updatedDate": "2017-07-16T08:17:09.227Z",
          "createdDate": "2017-07-14T11:20:09.884Z",
          "officeAddressGeolocation": [
            -6.3705916,
            106.8406042
          ],
          "officeAddressName": "Jalan YZAB",
          "homeAddressGeolocation": [
            -6.3705916,
            106.8406042
          ],
          "homeAddressName": "Jalan IJKL",
          "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F5968dd5d99bb522becfc3957_andika.png",
          "username": "andika"
        },
        "_id": "596c5ba554bed30dcc5ac166",
        "status": "pending"
      }
    ],
    "placeAddressGeolocation": []
  },
  {
    "_id": "596c5c3354bed30dcc5ac167",
    "title": "oscar",
    "description": "ganteng",
    "meetingTime": "2017-07-31T06:40:00.000Z",
    "confirmationTime": "2017-07-26T06:40:00.000Z",
    "typePlaces": "bar",
    "creator": {
      "_id": "596772300a384171ee3d8be6",
      "name": "Butet Sinaga",
      "password": "$2a$10$LFDiDsqIcvspn92lCR0Nmu6pBg798.zX.rFIJamao.rR6DyDUHuk6",
      "email": "butetbatak26@gmail.com",
      "__v": 0,
      "updatedDate": "2017-07-17T09:02:46.612Z",
      "createdDate": "2017-07-13T13:14:19.626Z",
      "officeAddressGeolocation": [
        -6.2607187,
        106.7816162
      ],
      "officeAddressName": "Jalan UVWX",
      "homeAddressGeolocation": [
        -6.2607187,
        106.7816162
      ],
      "homeAddressName": "Jalan EFGH",
      "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F596772300a384171ee3d8be6_butet.png",
      "username": "butet"
    },
    "__v": 1,
    "updatedDate": "2017-07-17T03:37:19.365Z",
    "createdDate": "2017-07-17T03:37:19.365Z",
    "location15": [],
    "location30": [],
    "location60": [],
    "status": "TBA",
    "participants": [
      null,
      null
    ],
    "placeAddressGeolocation": []
  },
  {
    "_id": "596c94620416682f4a69e857",
    "title": "nama",
    "description": "nama",
    "meetingTime": "2017-07-26T20:37:00.000Z",
    "confirmationTime": "2017-07-19T04:37:00.000Z",
    "typePlaces": "park",
    "creator": {
      "_id": "596772300a384171ee3d8be6",
      "name": "Butet Sinaga",
      "password": "$2a$10$LFDiDsqIcvspn92lCR0Nmu6pBg798.zX.rFIJamao.rR6DyDUHuk6",
      "email": "butetbatak26@gmail.com",
      "__v": 0,
      "updatedDate": "2017-07-17T09:02:46.612Z",
      "createdDate": "2017-07-13T13:14:19.626Z",
      "officeAddressGeolocation": [
        -6.2607187,
        106.7816162
      ],
      "officeAddressName": "Jalan UVWX",
      "homeAddressGeolocation": [
        -6.2607187,
        106.7816162
      ],
      "homeAddressName": "Jalan EFGH",
      "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F596772300a384171ee3d8be6_butet.png",
      "username": "butet"
    },
    "__v": 0,
    "updatedDate": "2017-07-17T07:52:21.187Z",
    "createdDate": "2017-07-17T07:52:21.187Z",
    "location15": [],
    "location30": [],
    "location60": [],
    "status": "TBA",
    "participants": [
      {
        "user": {
          "_id": "596772300a384171ee3d8be6",
          "name": "Butet Sinaga",
          "password": "$2a$10$LFDiDsqIcvspn92lCR0Nmu6pBg798.zX.rFIJamao.rR6DyDUHuk6",
          "email": "butetbatak26@gmail.com",
          "__v": 0,
          "updatedDate": "2017-07-17T09:02:46.612Z",
          "createdDate": "2017-07-13T13:14:19.626Z",
          "officeAddressGeolocation": [
            -6.2607187,
            106.7816162
          ],
          "officeAddressName": "Jalan UVWX",
          "homeAddressGeolocation": [
            -6.2607187,
            106.7816162
          ],
          "homeAddressName": "Jalan EFGH",
          "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F596772300a384171ee3d8be6_butet.png",
          "username": "butet"
        },
        "_id": "596c94620416682f4a69e85a",
        "status": "pending"
      },
      {
        "user": {
          "_id": "5968dd5d99bb522becfc3957",
          "name": "aldy andika",
          "password": "$2a$10$6wqg3xWb.iYXIKstGKFhDeOElSN3qr4TgRoacm7IaOV30uvBbBJTO",
          "email": "aldyandika@gmail.com",
          "__v": 0,
          "updatedDate": "2017-07-16T08:17:09.227Z",
          "createdDate": "2017-07-14T11:20:09.884Z",
          "officeAddressGeolocation": [
            -6.3705916,
            106.8406042
          ],
          "officeAddressName": "Jalan YZAB",
          "homeAddressGeolocation": [
            -6.3705916,
            106.8406042
          ],
          "homeAddressName": "Jalan IJKL",
          "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F5968dd5d99bb522becfc3957_andika.png",
          "username": "andika"
        },
        "_id": "596c94620416682f4a69e859",
        "status": "pending"
      },
      {
        "user": {
          "_id": "59695b5d99bb522becfc3958",
          "name": "shabrina inmas",
          "password": "$2a$10$aLwUMoCWMXVgN9JUZ0AIOe8Kaz2swvgJ9jthEtwaCpZNb8j/.caYu",
          "email": "ingelieur@gmail.com ",
          "__v": 0,
          "updatedDate": "2017-07-15T17:51:29.350Z",
          "createdDate": "2017-07-14T11:20:09.884Z",
          "officeAddressGeolocation": [
            -6.922998,
            107.622495
          ],
          "officeAddressName": "Jalan CDEF",
          "homeAddressGeolocation": [
            -6.922998,
            107.622495
          ],
          "homeAddressName": "Jalan MNOP",
          "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F59695b5d99bb522becfc3958_esviai.png",
          "username": "esviai"
        },
        "_id": "596c94620416682f4a69e858",
        "status": "pending"
      }
    ],
    "placeAddressGeolocation": []
  },
  {
    "_id": "596cc8c563ec05512439c127",
    "title": "Reuni",
    "description": "Reuni OTW Ketrmu",
    "meetingTime": "2017-07-17T19:00:00.000Z",
    "confirmationTime": "2017-07-17T16:47:00.000Z",
    "typePlaces": "shopping_mall",
    "creator": {
      "_id": "5968dd5d99bb522becfc3957",
      "name": "aldy andika",
      "password": "$2a$10$6wqg3xWb.iYXIKstGKFhDeOElSN3qr4TgRoacm7IaOV30uvBbBJTO",
      "email": "aldyandika@gmail.com",
      "__v": 0,
      "updatedDate": "2017-07-16T08:17:09.227Z",
      "createdDate": "2017-07-14T11:20:09.884Z",
      "officeAddressGeolocation": [
        -6.3705916,
        106.8406042
      ],
      "officeAddressName": "Jalan YZAB",
      "homeAddressGeolocation": [
        -6.3705916,
        106.8406042
      ],
      "homeAddressName": "Jalan IJKL",
      "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F5968dd5d99bb522becfc3957_andika.png",
      "username": "andika"
    },
    "__v": 0,
    "updatedDate": "2017-07-17T12:05:14.375Z",
    "createdDate": "2017-07-17T12:05:14.375Z",
    "location15": [],
    "location30": [],
    "location60": [],
    "status": "TBA",
    "participants": [
      {
        "user": {
          "_id": "5968dd5d99bb522becfc3957",
          "name": "aldy andika",
          "password": "$2a$10$6wqg3xWb.iYXIKstGKFhDeOElSN3qr4TgRoacm7IaOV30uvBbBJTO",
          "email": "aldyandika@gmail.com",
          "__v": 0,
          "updatedDate": "2017-07-16T08:17:09.227Z",
          "createdDate": "2017-07-14T11:20:09.884Z",
          "officeAddressGeolocation": [
            -6.3705916,
            106.8406042
          ],
          "officeAddressName": "Jalan YZAB",
          "homeAddressGeolocation": [
            -6.3705916,
            106.8406042
          ],
          "homeAddressName": "Jalan IJKL",
          "avatarURL": "https://elasticbeanstalk-us-west-2-183031211456.s3.amazonaws.com/profile_pictures%2F5968dd5d99bb522becfc3957_andika.png",
          "username": "andika"
        },
        "_id": "596cc8c563ec05512439c128",
        "status": "pending"
      }
    ],
    "placeAddressGeolocation": []
  }
]
