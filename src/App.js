import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BuildTripForm from './BuildTripForm.js';
import MainNav from './MainNav.js';
import TripDetails from './TripDetails';

class App extends Component {
  constructor() {
    super()
      this.state = {
        
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
        {/* <Route path="/details" component={TripDetails} /> */}
      </div>
      </Router>
    );
  }
}

export default App;

// building by Rudez Studio from the Noun Project
// https://thenounproject.com/rudezstudio/collection/building-and-manufacturing/