import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import HotelListing from './HotelListing';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Hotel Motel Holiday Inn"
          showMenuIconButton={false}
        />
        <div>
          <h3 className={'header'}>Hotels in Paris</h3>
          <HotelListing />
        </div>
      </div>
    );
  }
}

export default App;
