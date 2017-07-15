let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

export default function geolocation (callback) {
  navigator.geolocation.getCurrentPosition(position => {
    callback({latitude: position.coords.latitude, longitude: position.coords.longitude})
  },
    (error) => callback({error: error.message}),
    options
  )
}
