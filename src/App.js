import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import axios from 'axios';
// import Qs from 'qs';
import BuildTripForm from './BuildTripForm.js';
import TripDashboard from './TripDashboard.js';
// import TripDetails from './TripDetails.js';
// import activitiesArray from './activitiesArray.js'

class App extends Component {
  
  
  render() {
    return (
      <Router>
      <div className="App">

        <Route exact path='/' component={BuildTripForm} />
        <Route path="/dashboard" component={TripDashboard} />
        {/* <TripDashboard /> */}
        {/* <TripDetails /> */}
      </div>
      </Router>
    );
  }
}

export default App;
