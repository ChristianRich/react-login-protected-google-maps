import React from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      currentPostion: props.currentPostion,
    }
  }

  handleChange = (address) => {
    this.setState({ address })
  }

  /**
   * Reverse geocode address to lat/lng pair used for Google Maps directions service
   * @param {string} address from user selection
   */
  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.props.onLocationInputSelect({ latLng, address })
      })
      .catch((error) => console.error('Error', error)) // TODO Handle network, API key and rate limiting errors and show in UI
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Enter your destination',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}

              {suggestions.map((suggestion, idx) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' }

                return (
                  <div
                    key={idx}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }
}

export default LocationSearchInput
