import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker, Map } from 'google-maps-react';
import './App.css';

class MapContainer extends Component {
  
  render() {
    return (
      <div className='map-container'>
        <Map
          google={this.props.google}
          zoom={13}
          initialCenter={{
            lat: 55.6805,
            lng: 12.5860
          }}
        />
      </div>
    )
  }
}

export default MapContainer
