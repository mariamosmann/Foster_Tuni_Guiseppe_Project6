import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BuildTripForm from './BuildTripForm.js';
import MainNav from './MainNav.js';


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
        
      </div>
      </Router>
    );
  }
}

export default App;

//DONT FORGET TO SET THE NEW USER BACK UP WHEN WE ARE DONE

// building by Rudez Studio from the Noun Project
// https://thenounproject.com/rudezstudio/collection/building-and-manufacturing/