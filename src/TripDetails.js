import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
// import Qs from 'qs';
// import activitiesArray from './activitiesArray.js'

//GROUP MEMBERS (side pannel)
//members that were already added: use forEach method (we don't need another array, so no map or filter) on array of users to display their name and photo 
//options for getting the array: as a prop, importing a js file (that will only have the array), making a call to the API and storing the info in the state of this component (I don't see any advantage in doing that. Information that needs to be passed around for other components should be in the App)
//store that array's info in the state of this component (we'll need to add members to it later)
//make a button that will add more users
//stretch goal in case we have a group admin: add an x icon so the admin can delete members

//"HEADER"
//use same structure as the dashboard, with logout option under the user's icon/photo, but instead of name of the user will display the name of the group (h2) (information passed as a prop from where we're storing information about the user's groups)
//*****NOTE***** dashboard: info about the user (groups, friends, etc) || trip details: info about the trip itself

//PICKING A PLACE
//destination board (div)
//Destination (h3)
//Info passed as prop: display the destination (p) that the creator of the group chose when creting the group and in the reason (p) display which category they chose
//form (connected to handle input) for adding more suggestions: one text input for place, one text input for reson, submit button w/ onClick 
//handle sumbit will stop default behaviour, push new info to firebase, reset the state 
//info will be added and displayed dynamically

//VOTING SYSTEM +  ESSENTIALS BOARD
//suggestions will have up and down icons with onClick to controle the voting system
//everytime a user votes, it's id will be added to an array named as the place, it will serve as a way to count how many voted that place had (.length), as well as who voted for it 
//when user tries to vote it will check if they already voted for that suggestions (filter? better method? +  if), they can vote in as many suggestions as they want, but only once
//once a place reaches the majority of the votes (half the users + 1) take voting system out for that board, display all the essential boards, they will have the same structure as the destination board

//ADDING BOARDS









class TripDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="App">

            </div>
        );
    }
}

export default TripDetails;