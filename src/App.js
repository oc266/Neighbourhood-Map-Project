import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from './MapContainer.js';
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
    displayedLocations: [],
    query: ''
  }

  componentDidMount() {
    document.querySelector('.places-hamburger').addEventListener('click', function (e) {
      document.querySelector('.places-search-list').classList.toggle('open');
      e.stopPropagation();
    })
  }

  UpdateQuery = (query) => {
    this.setState({ query })
    console.log(query)
  }

  render() {
    const { google } = this.props
    const { query, locations } = this.state
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
              type="text"
              placeholder="Search location"
              value={query}
              onChange={(event) => this.UpdateQuery(event.target.value)}
            />
          </div>
          <ul className="places-list">
            {locations.map((location, i) => (
              <li key={i} className="list-item">
                <div className="place-list-item">
                  <p>{location.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <div className="map-container">
          <MapContainer
            google={google}
            locations={locations}
          />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA4C2NSjx4sMd73sbPuafBS6mjCnr_sYVE'
})(App);
