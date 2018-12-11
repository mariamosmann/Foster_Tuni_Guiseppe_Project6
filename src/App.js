import React, { Component } from 'react';

import './App.css';
import firebase from './firebase.js';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
// import axios from 'axios';
// import Qs from 'qs';
import BuildTripForm from './BuildTripForm.js';
import TripDashboard from './TripDashboard.js';
import TripDetails from './TripDetails.js';
// import activitiesArray from './activitiesArray.js'

class App extends Component {
  constructor() {
    super()
      this.state = {
        userChoice: '',
        // formSubmitted: false
      }
  }
  componentDidMount(){
    this.setState({

    })
  }

    
  
  render() {
    return (
      <Router>
      <div className="App">

        <Route exact path='/' component={BuildTripForm} />
        <Route path="/dashboard" component={TripDashboard} />
        <Route path="/details" component={TripDetails} />
          {/* // render ={() =>
            this.state.formSubmitted ? (
              <Redirect to='/details' />
            ) :
            (
              <Redirect to='/' />
            )
          }
        
            country={this.state.userChoice.country}
            city={this.state.userChoice.city}
            typeInput={this.state.userChoice.typeInput}
            groupMembers={this.state.typeInput.country.users}
            popUp={this.popUp}
            popUpButton={this.state.popUpButton}
            inviteFriend={this.state.setEmails} /> */}
            
        
        {/* <TripDashboard /> */}
        {/* <TripDetails /> */}
      </div>
      </Router>
    );
  }
}

export default App;
