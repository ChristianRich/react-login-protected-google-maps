import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import PageContainer from '../../components/PageContainer'
import { withAuthorization } from '../../components/Session'
import LocationSearchInput from '../../components/LocationSearchInput'
import Map from '../../components/Map'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userPosition: null,
      destination: null,
      error: null,
      places: [],
    }
  }

  getUserLocation = () =>
    new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        (result) => resolve(result.coords),
        (error) => reject(error)
      )
    )

  /**
   * Update state once user selects a destination
   * @param {object} location
   */
  onLocationInputSelect = (location) => {
    // User's current location from navigator.getCurrentPosition()
    const from = {
      latitude: this.state.userPosition.latitude,
      longitude: this.state.userPosition.longitude,
    }

    // Reverse geo coding result from location selection in <LocationSearchInput> dropdown
    const to = {
      address: location.address,
      latitude: location.latLng.lat,
      longitude: location.latLng.lng,
    }

    // Now that we have both origin (from) and destination (to), we can ask Google Maps to calculate the route on the map
    this.setState({
      places: [from, to],
      error: null,
    })
  }

  onDirectionsError = (e) => {
    this.setState({
      places: [],
      error:
        'Sorry, we were unable to calculate the route, please try using a destination closer to your current location.',
    })
  }

  componentDidMount = async () => {
    try {
      const position = await this.getUserLocation()
      const { latitude, longitude } = position

      this.setState({
        error: null,
        userPosition: {
          latitude,
          longitude,
        },
      })
    } catch (e) {
      this.setState({
        error:
          'Sorry, we were not able to get your current location. Please make sure you accept location permissions.',
        userPosition: null,
      })
    }
  }

  getDestination() {
    return this.state.places.length ? this.state.places[1].address : null
  }

  render() {
    const googleMapsApiKey = 'AIzaSyCW69-iSdalEkMAt09S5K_k470nmXIVro0' // TODO Add to config
    const destinationAddress = this.getDestination()

    return (
      <PageContainer>
        <Row>
          <Col className="col-sm">
            <Card>
              <Card.Body>
                <Card.Title>Driving route planner tool</Card.Title>
                <Card.Subtitle>
                  <div className="mt-4 mb-4">
                    Let's help you find the shortest driving distance to your
                    desired destination.
                  </div>

                  <div className="mt-4 mb-4">
                    <LocationSearchInput
                      onLocationInputSelect={this.onLocationInputSelect}
                      currentPostion={this.state.userPosition}
                    />
                  </div>
                </Card.Subtitle>

                {this.state.error && (
                  <div className="mb-2 mt-2">{this.state.error}</div>
                )}

                {this.state.userPosition ? (
                  <>
                    {destinationAddress && (
                      <p>
                        Please find your driving direction to &nbsp;
                        {destinationAddress}
                      </p>
                    )}
                    <Map
                      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=geometry,drawing,places`}
                      markers={this.state.places}
                      loadingElement={
                        <div style={{ height: `100%` }}>Loading map...</div>
                      }
                      containerElement={<div style={{ height: '80vh' }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      defaultCenter={{
                        lat: this.state.userPosition.latitude,
                        lng: this.state.userPosition.longitude,
                      }}
                      directionsErrorHandler={this.onDirectionsError}
                      defaultZoom={11}
                    />
                  </>
                ) : (
                  <p>Waiting for user location...</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </PageContainer>
    )
  }
}

const condition = (authUser) => !!authUser
export default withAuthorization(condition)(HomePage)
