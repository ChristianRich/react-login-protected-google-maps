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
      places: [],
      error: null,
    }
  }

  getUserLocation = () =>
    new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        (result) => resolve(result.coords),
        (error) => reject(error)
      )
    )

  onLocationInputSelect = (location) => {
    // User's current position from navigator.getCurrentPosition
    const from = {
      latitude: this.state.userPosition.latitude,
      longitude: this.state.userPosition.longitude,
    }

    // Reverse geo coding result from location selection in <LocationSearchInput> dropdown
    const to = { latitude: location.latLng.lat, longitude: location.latLng.lng }
    this.setState({ places: [from, to] })
  }

  onDirectionsError = (e) => {
    this.setState({
      places: [],
      error: e,
    })
  }

  async componentDidMount() {
    try {
      const position = await this.getUserLocation()
      const { latitude, longitude } = position

      this.setState({
        userPosition: {
          latitude,
          longitude,
        },
      })
    } catch (e) {
      this.setState({
        userPosition: null,
      })
    }
  }

  render() {
    const googleMapsApiKey = 'AIzaSyCW69-iSdalEkMAt09S5K_k470nmXIVro0'

    return (
      <PageContainer>
        <Row>
          <Col className="col-sm">
            <Card>
              <Card.Body>
                <Card.Title>Home</Card.Title>
                <Card.Subtitle className="mb-2">
                  Login protected page
                  <br />
                  Welcome <code>{this.props.authUser.email}!</code>
                  <br />
                  <br />
                </Card.Subtitle>

                <LocationSearchInput
                  onLocationInputSelect={this.onLocationInputSelect}
                />

                <br />

                {this.state.error && <div>{this.state.error}</div>}

                {this.state.userPosition && (
                  <Map
                    googleMapURL={
                      'https://maps.googleapis.com/maps/api/js?key=' +
                      googleMapsApiKey +
                      '&libraries=geometry,drawing,places'
                    }
                    markers={this.state.places}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: '80vh' }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    defaultCenter={{
                      lat: this.state.userPosition.latitude,
                      lng: this.state.userPosition.longitude,
                    }}
                    directionsErrorHandler={this.onDirectionsError}
                    defaultZoom={11}
                  />
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
