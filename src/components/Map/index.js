/* global google */
import React from 'react'
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps'

class MapDirectionsRenderer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      directions: null,
    }
  }

  componentDidMount() {
    const { places, travelMode, onError } = this.props

    const waypoints = places.map((p) => ({
      location: { lat: p.latitude, lng: p.longitude },
      stopover: true,
    }))

    const origin = waypoints.shift().location
    const destination = waypoints.pop().location
    const directionsService = new google.maps.DirectionsService()

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          })
        } else {
          this.setState({
            directions: null,
          })
          onError(status) // Propagate the error to the parent component
        }
      }
    )
  }

  render() {
    return (
      this.state.directions && (
        <DirectionsRenderer directions={this.state.directions} />
      )
    )
  }
}

const Map = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
    >
      {props.markers.map((marker, idx) => {
        const position = { lat: marker.latitude, lng: marker.longitude }
        return <Marker key={idx} position={position} />
      })}

      {props.markers.length && (
        <MapDirectionsRenderer
          places={props.markers}
          onError={(e) => {
            props.directionsErrorHandler(e)
          }}
          travelMode={google.maps.TravelMode.DRIVING}
        />
      )}
    </GoogleMap>
  ))
)

export default Map
