import React, { Component } from 'react';

import './App.css';
// import firebase from './firebase.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import axios from 'axios';
// import Qs from 'qs';
import BuildTripForm from './BuildTripForm.js';
import TripDashboard from './TripDashboard.js';
import MainNav from './MainNav.js';
import TripDetails from './TripDetails.js';

class App extends Component {
  constructor() {
    super()
      this.state = {
        // country: '',
        // city: "",
        // typeInput: "",
        // groupMembers: [],
        // cities: [
        //   {
        //     city: "",
        //     type: "",
        //     votes: 0,
        //     whoVoted: []
        //   }
        // ],
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
        <MainNav />
        <Route path='/' component={BuildTripForm} />
        {/* <Route path="/dashboard" component={TripDashboard} /> */}
        {/* <Route path="/details" component={TripDetails} 
                    render = {() => (<TripDetails
            country={this.state.country}
            city={this.state.city}
            type={this.state.typeInput}
            groupMembers={this.state.selectedType.country.country.users}
            popUp={this.popUp}
            popUpButton={this.state.popUpButton}
            inviteFriend={this.state.setEmails}
          />
          )} 
          /> */}
      </div>
      </Router>
    );
  }
}

export default App;

//DONT FORGET TO SET THE NEW USER BACK UP WHEN WE ARE DONE

// building by Rudez Studio from the Noun Project
// https://thenounproject.com/rudezstudio/collection/building-and-manufacturing/