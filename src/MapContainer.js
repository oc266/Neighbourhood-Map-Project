import React, { Component } from 'react';
import { Map, Marker, InfoWindow } from 'google-maps-react';

class MapContainer extends Component {

  render() {
    const { google, locations, onMarkerMounted, onMarkerClick, wikiData, selectedLocation, activeMarker, displayingInfoWindow } = this.props
    return (
      <div className='map' role='application' ref='map'>
        <Map role='application' ref='map'
          google = {google}
          zoom={10.5}
          initialCenter={{
            lat: 51.5152,
            lng: -0.1819
          }}
          >
          {locations.map((location, i) => (
            <Marker
              ref={onMarkerMounted}
              key={i}
              title={location.name}
              position={location.location}
              onClick={(props, marker) => onMarkerClick(props, marker)}
            />
          ))}
          <InfoWindow
            marker={activeMarker}
            visible={displayingInfoWindow}
          >
            <div className='info_window'>
              <p>{activeMarker.title}</p>
              {wikiData.map(data => data.name === selectedLocation.title &&
                <div key={data.text}>
                  <p>
                    {data.text}
                  </p>
                  <a
                    href={data.url}
                    className='get_more_info'
                  >
                    {data.getMoreInfo}
                  </a>
                </div>
              )}
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default MapContainer
