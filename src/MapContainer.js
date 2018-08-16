import React, { Component } from 'react';
import { Map, Marker, InfoWindow } from 'google-maps-react';

class MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedLocation: {},
    displayingInfoWindow: false
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      activeMarker: marker,
      selectedLocation: props,
      displayingInfoWindow: true
    })
    console.log(props)
    console.log(marker)
  }


  render() {
    return (
      <div className='map' role='application' ref='map'>
        <Map role='application' ref='map'
          google={this.props.google}
          zoom={12}
          initialCenter={{
            lat: 47.4779,
            lng: 19.0902
          }}
          >
          {this.props.locations.map((location, i) => (
            <Marker key={i}
              title={location.name}
              position={location.location}
              onClick={(props, marker) => this.onMarkerClick(props, marker)}
              animation={
                (this.state.selectedLocation.title === location.name)
                && this.props.google.maps.Animation.BOUNCE
              }
            />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.displayingInfoWindow}
          >
            <p>{this.state.activeMarker.title}</p>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default MapContainer
