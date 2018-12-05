import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
// import Qs from 'qs';
import LandingPage from './LandingPage.js';
import TripDashboard from './TripDashboard.js';
import TripDetails from './TripDetails.js';
// import activitiesArray from './activitiesArray.js'

class App extends Component {
  
  
  render() {
    return (
      <div className="App">
        <LandingPage />
        <TripDashboard />
        <TripDetails />
      </div>
    );
  }
}

export default App;
