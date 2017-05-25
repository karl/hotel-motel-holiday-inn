import React, { Component } from 'react';
import HotelListing from './HotelListing';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Hotel Motel Holiday Inn</h2>
        </div>
        <div className="App-intro">
          <h3>Hotels</h3>
          <HotelListing />
        </div>
      </div>
    );
  }
}

export default App;
