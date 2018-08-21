import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from './MapContainer.js';
import escapeRegExp from 'escape-string-regexp';
import './App.css';

class App extends Component {
  state = {
    locations: [
      {name: 'Griffin Park', location: {lat: 51.4882, lng: -0.3025}},
      {name: 'Craven Cottage', location: {lat: 51.4749, lng: -0.2218}},
      {name: 'Emirates Stadium', location: {lat: 51.5549, lng: -0.1084}},
      {name: 'Stamford Bridge', location: {lat: 51.4817, lng: -0.1910}},
      {name: 'Loftus Road', location: {lat: 51.5093, lng: -0.2321}},
      {name: 'Wembley Stadium', location: {lat: 51.5560, lng: -0.2795}},
      {name: 'London Stadium', location: {lat: 51.5387, lng: -0.0166}},
      {name: 'Selhurst Park', location: {lat: 51.3992, lng: -0.0864}},
      {name: 'The Den', location: {lat: 51.4859, lng: -0.0509}}
    ],
    query: '',
    activeMarker: {},
    selectedLocation: {},
    wikiData: [],
    displayingInfoWindow: false
  }

  // A list of markers to fill as markers are added to the map or are changed.
  markers = []

  // A function to call when the page loads to set up an event listener on the
  // hamburger icon and to fetch the data from Wikipedia for the infowindows.
  componentDidMount() {
    document.querySelector('.places-hamburger').addEventListener('click', function (e) {
      document.querySelector('.places-search-list').classList.toggle('open');
      e.stopPropagation();
    })
    this.getWikiData()
  }

  // Function to push a marker to the list of markers, to be called when markers
  // are mounted on the map.
  onMarkerMounted = (marker) => {
    if (marker != null) {
      this.markers.push(marker)
    }
  }

  // A function to animate a marker and to set the state for the active marker,
  // for the selected location and for whether an info window should display.
  // To be called whenever a marker is clicked or whenever an item in the list
  // in the sidebar is clicked.
  onMarkerClick = (props, marker, e) => {
    marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
    this.setState({
      activeMarker: marker,
      selectedLocation: props,
      displayingInfoWindow: true
    })
    marker.setAnimation(null)
  }

  // A function to set the state query, to be called whenever the app user
  // changes the input to the search field in the sidebar.
  updateQuery = (query) => {
    this.setState({ query })
  }

  // Function to fetch data from Wikipedia about all the locations. To be called
  // on the page mounting so that all the data pulled from wikipedia can be
  // stored in a state array, with entries for each location.
  getWikiData = () => {
    let wikiData = []
    // Fetch a search result for each location in the locations array.
    this.state.locations.map((location) => {
      return fetch(`https://en.wikipedia.org/w/api.php?&action=query&list=search&prop=extracts&titles&format=json&origin=*&srlimit=1&srsearch=${location.name}`)
      // For each location's search result, we want to get the snippet and also
      // create the URL for wikipedia's page on the location so that we can
      // provide users with a snippet of information and also provide a link
      // to the full Wikipedia page in the infowindows.
      .then(response => response.json())
      .then(data => {
        let locationData = {
          name: location.name,
          text: data.query.search['0'].snippet.replace(/<(?:.|\n)*?>/gm, ''),
          getMoreInfo: `Get more information about ${location.name}`,
          url: encodeURI(`https://en.wikipedia.org/wiki/${data.query.search['0'].title}`)
        }
        wikiData.push(locationData)
        this.setState({ wikiData })
      })
      // If the request for data failed, then we will need to load information
      // which can be used to inform the user that the search failed
      .catch(() => {
        let locationData = {
          name: location.name,
          text: 'Could not fetch data from Wikipedia - please try again later',
          getMoreInfo: 'No link could be found for further information'
        }
        wikiData.push(locationData)
        this.setState({ wikiData })
      })
    })
  }

  // A function to simulate a click of the marker when the user clicks the
  // corresponding link in the sidebar. Simulating a click will trigger the
  // calling of the onMarkerClick function to bring up the infowindow and
  // animate the marker.
  selectLocation = (location) => {
    let matchedMarker = this.markers.filter((marker) => marker.props.title === location.textContent)[0]
    matchedMarker.props.google.maps.event.trigger(matchedMarker.marker, 'click')
    // If the screen width is below 625 pixels then hide the sidebar on clicking
    // the link in it, so that the user can see the map.
    if (window.screen.width < 625) {
       document.querySelector('.places-search-list').classList.toggle('open')
     }
  }

  // Render the page
  render() {
    const { google } = this.props
    const { query, locations, activeMarker, selectedLocation, wikiData, displayingInfoWindow } = this.state

    // Fill an array called filteredLocations either with locations matching the
    // search query, if a query has been made, or with all locations. This will
    // be passed to the MapContainer component so that only these locations will
    // be shown on the map and in the sidebar list.
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
            wikiData={wikiData}
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
