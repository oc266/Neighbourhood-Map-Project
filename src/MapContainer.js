import React, { Component } from 'react';
import { Map, Marker, InfoWindow } from 'google-maps-react';

class MapContainer extends Component {

  render() {
    const { google, markers, locations, onMarkerClick, selectedLocation, activeMarker, displayingInfoWindow } = this.props
    return (
      <div className='map' role='application' ref='map'>
        <Map role='application' ref='map'
          google = {google}
          zoom={12}
          initialCenter={{
            lat: 47.4779,
            lng: 19.0902
          }}
          >
          {locations.map((location, i) => (
            <Marker key={i}
              title={location.name}
              position={location.location}
              onClick={(props, marker) => onMarkerClick(props, marker)}
              animation={
                (selectedLocation.title === location.name)
                && google.maps.Animation.BOUNCE
              }
            />
          ))}
          <InfoWindow
            marker={activeMarker}
            visible={displayingInfoWindow}
          >
            <p>{activeMarker.title}</p>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default MapContainer
