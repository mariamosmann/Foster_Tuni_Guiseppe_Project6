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

           
            // create a div called "your trips" that has a clickable image, 
            //when clicked it pulls in all the user's saved trip information and appends it to dom
            //saved information appended will be all trips that they have planned or are associated with, as well as everything they are associated in split by activity.
            //each trip and activity will be it's own clickable div which will link to trip details page
            //create a div called "Community Plans" that has a clickable image,
            //when clicked it appends clickable divs related to the activity/reason for travel
            //each activity div will pull in all trips being planned that other user(s) have chosen to make public.
            //Add a div called "Start Planning" which will bring you back to the home page to select a destination/dates/reason for travel.

         

    render() {
        return (
                <Router>
            <div>
                <div className="dashboard">

                    <div>
                        <Link to='/dashboard/user'> Your Trips</Link>
                        <Route path='/dashboard/user' component={YourTrip}  ></Route>
                    </div>
                    <div>
                        <Link to='/dashboard/public'>Community Portal</Link>
                        <Route path='/dashboard/public' component={Public}></Route>
                    </div>
                </div>    
                
            </div>
            </Router>

            
            // {/* // <div className="dashboard">
            
            // //     <div key={user.id}>
            // //         <Link to={`/dashboard/${user.id}`} onChange="userDash"> Your Trips</Link>
            // //     </div>
            // //     <div>
            // //         <Link path="/dashboard/guest" onChange="guestDash">Community Portal</Link>
            // //     </div>  */}
            // {/* // <Router>


            
            
            // //     <div className="dashboard-user">
                    

            // //     </div>
            // //     <div className="dashboard-guest">
            // //         <div>
            // //             <Link path="/details/">Leisure</Link>
            // //         </div>
            // //         <div>
            // //             <Link path="/details/">Culture</Link>
            // //         </div>
            // //         <div>
            // //             <Link path="/details/">Nature</Link>
            // //         </div>
            // //         <div>
            // //             <Link path="/details/">Adventure</Link>
            // //         </div>
            // //         <div>
            // //             <Link path="/details/">Romantic</Link>
            // //         </div>
            // //         <div>
            // //             <Link path="/details/">Nightlife</Link>
            // //         </div>
            // //         <div>
            // //             <Link path="/details/">Food</Link>
            // //         </div>
            // //         <div>
            // //             <Link path="/details/">Other</Link>
            // //         </div>
            // //     </div>

            // // </div>
            // // </Router> */}
        );
    }
    
}


export default TripDashboard;