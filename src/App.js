import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from './MapContainer.js';
import './App.css';

class App extends Component {

  componentDidMount() {
    document.querySelector('.places-hamburger').addEventListener('click', function (e) {
      document.querySelector('.places-list').classList.toggle('open');
      e.stopPropagation();
    })
  }

  render() {
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
        <section className="places-list">
          <p>Hello</p>
        </section>
        <MapContainer
          google={this.props.google}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA4C2NSjx4sMd73sbPuafBS6mjCnr_sYVE'
})(App);
