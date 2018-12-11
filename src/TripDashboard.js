import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import BuildTripForm from './BuildTripForm.js';
// import TripDetails from './TripDetails.js';
// import axios from 'axios';
// import Qs from 'qs';
// import activitiesArray from './activitiesArray.js'

class YourTrip extends Component{
    render(){
        return(
            <div>
                
                <Link to='/display/'>Leisure</Link>
                <Link to='/display'>Adventure</Link>
                <Link to='/display'>Culture</Link>
                <Link to='/display'>Nightlife</Link>
                <Link to='/display'>Romantic</Link>
                <Link to='/display'>Food</Link>
                <Link to='/display'>Nature</Link>
                <Link to='/display'>Other</Link>
                  
            </div>
        
        )
    }
}

class Public extends Component {
    render() {
        return (
            <div>
                <Link to='/display'>Leisure</Link>
                <Link to='/display'>Adventure</Link>
                <Link to='/display'>Culture</Link>
                <Link to='/display'>Nightlife</Link>
                <Link to='/display'>Romantic</Link>
                <Link to='/display'>Food</Link>
                <Link to='/display'>Nature</Link>
                <Link to='/display'>Other</Link>
            </div>
        )
    }
}

class TripDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: '',
            user: {}

        }
    }

    render() {
        return (
             
            <div>
                <div className="dashboard">
                    <div>

                    </div>
                   
                    <div>
                        <Link to='/dashboard/:user_id'> Your Trips</Link>
                        <Route path='/dashboard/:user_id' component={YourTrip} />
                    </div>
                    <div>
                        <Link to='/dashboard/:guest'>Community Portal</Link>
                        <Route path='/dashboard/:guest' component={Public} />
                    </div>
                        
                
                </div>
            </div>
            

        );
    }
    
}


export default TripDashboard;