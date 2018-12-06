import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
// import Qs from 'qs';
import BuildTripForm from './BuildTripForm.js';
import TripDashboard from './TripDashboard.js';
import TripDetails from './TripDetails.js';
import firebase from './firebase.js';
// import activitiesArray from './activitiesArray.js'

class App extends Component {
  
  
  render() {
    return (
      <div className="App">
        <BuildTripForm />
        <TripDashboard />
        <TripDetails />
      </div>
    );
  }
}

export default App;
