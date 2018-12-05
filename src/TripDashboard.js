import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Qs from 'qs';
import activitiesArray from './activitiesArray.js'

class TripDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // create a div called "your trips" that has a clickable image, 
            //when clicked it pulls in all the user's saved trip information and appends it to dom
            //saved information appended will be all trips that they have planned or are associated with, as well as everything they are associated in split by activity.
            //each trip and activity will be it's own clickable div which will link to trip details page
            //create a div called "Community Plans" that has a clickable image,
            //when clicked it appends clickable divs related to the activity/reason for travel
            //each activity div will pull in all trips being planned that other user(s) have chosen to make public.
            //Add a div called "Start Planning" which will bring you back to the home page to select a destination/dates/reason for travel.

        }
    }
    render() {
        return (
            <div className="App">
            

            </div>
        );
    }
}


export default TripDashboard;