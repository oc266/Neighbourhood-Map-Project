import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from './MapContainer.js';
import escapeRegExp from 'escape-string-regexp';
import './App.css';

class App extends Component {
  state = {
    locations: [
      {name: 'Csendes Arts N Crafts', type: 'Craft shopping', location: {lat: 47.492665, lng: 19.060121}},
      {name: 'Fekete Kutya', type: 'Bar', location: {lat: 47.498818, lng: 19.062039}},
      {name: 'Rengeteg RomKafé ', type: 'Hot chocolate café', location: {lat: 47.483592, lng: 19.072656}},
      {name: 'Kozmosz Vegán Étterem', type: 'Vegan restaurant', location: {lat: 47.449166, lng: 19.130861}},
      {name: 'ExitPoint Games', type: 'Exit room', location: {lat: 47.4989, lng: 19.0573}}
    ],
    query: '',
    activeMarker: {},
    selectedLocation: {},
    displayingInfoWindow: false
  }

  markers =  []

  componentDidMount() {
    document.querySelector('.places-hamburger').addEventListener('click', function (e) {
      document.querySelector('.places-search-list').classList.toggle('open');
      e.stopPropagation();
    })
  }

  onMarkerMounted = (marker) => {
    if (marker != null) {
      if (this.markers.length != this.state.locations.length) {
        this.markers.push(marker)
      }
    }
    console.log(this.markers)
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      selectedLocation: props,
      displayingInfoWindow: true
    })
  }

  updateQuery = (query) => {
    this.setState({ query })
  }

  selectLocation = (location) => {
    let matchedMarker = this.markers.filter((marker) => marker.props.title == location.textContent)[0]
    matchedMarker.props.google.maps.event.trigger(matchedMarker.marker, 'click')

    if (window.screen.width < 625) {
       document.querySelector('.places-search-list').classList.toggle('open')
     }
  }

  render() {
    const { google } = this.props
    const { query, locations, activeMarker, selectedLocation, displayingInfoWindow } = this.state

    let filteredLocations
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      filteredLocations = locations.filter((location) => match.test(location.name))
    } else {
      filteredLocations = locations
    }

    return (
      <div className="app">
        <header className="app-header">
          <a className="places-hamburger">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
            </svg>
          </a>
          <h1 className="app-title">Neighborhood Map</h1>
        </header>
        <section className="places-search-list">
          <div className='places-search-bar'>
            <input
              role="search"
              type="text"
              placeholder="Search location"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
          <ul className="places-list">
            {filteredLocations.map((location, i) => (
              <li key={i} className="list-item">
                <button
                  className="place-list-item"
                  onClick={(event) => this.selectLocation(event.target)}
                  >
                  {location.name}
                </button>
              </li>
            ))}
          </ul>
        </section>
        <div className="map-container">
          <MapContainer
            google={google}
            locations={filteredLocations}
            onMarkerMounted={this.onMarkerMounted}
            onMarkerClick={this.onMarkerClick}
            activeMarker={activeMarker}
            selectedLocation={selectedLocation}
            displayingInfoWindow={displayingInfoWindow}
          />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA4C2NSjx4sMd73sbPuafBS6mjCnr_sYVE'
})(App);
