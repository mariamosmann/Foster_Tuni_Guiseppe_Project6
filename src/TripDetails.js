import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
// import Qs from 'qs';
// import activitiesArray from './activitiesArray.js'

//CHANGES: COUNTRY IS SET, USERS CAN ONLY ADD CITIES IN THAT COUNTRY, THEY DON'T NEED TO ADD A REASON ANYMORE, COUNTRY AND REASON (FROM DROP DOWN) SHOULD BE DISPLAYED, EVERY CITY THAT GETS APPROVED SHOULD GO TO AN ARRAY AND APPEAR IN A DROP DOWN WHEN THEY PRESS THE + BUTTON, EVERY BOARD WILL DISPLAY A NAME AND PLACE THAT IS RELATED TO (like HOTEL - PARIS), ON TOP OF THE PRE SET LIST THAT WILL BE DISPLAYED, USERS CAN PICK A CATHEGORY FOR THAT BOARD (hotel, activities, restaurantes, shows, etc -- so it will be easiet to implement suggestions later)

//GROUP MEMBERS (side pannel)
//members that were already added: use forEach method (we don't need another array, so no map or filter) on array of users to display their name and photo 
//options for getting the array: as a prop, importing a js file (that will only have the array), making a call to the API and storing the info in the state of this component (I don't see any advantage in doing that. Information that needs to be passed around for other components should be in the App)
//store that array's info in the state of this component (we'll need to add members to it later)
//make a button that will add more users
//stretch goal in case we have a group admin: add an x icon so the admin can delete members



//PICKING A PLACE
//destination board (div)
//Destination (h3)
//Info passed as prop: display the destination (p) that the creator of the group chose when creting the group and in the reason (p) display which category they chose
//form (connected to handle input) for adding more suggestions: one text input for place, one text input for reson, submit button w/ onClick 
//handle sumbit will stop default behaviour, push new info to firebase, reset the state 
//info will be added and displayed dynamically

//VOTING SYSTEM +  ESSENTIALS BOARD
//suggestions will have up and down icons with onClick to control the voting system
//everytime a user votes, it's id will be added to an array named as the place, it will serve as a way to count how many voted that place had (.length), as well as who voted for it 
//when user tries to vote it will check if they already voted for that suggestions (filter? better method? +  if), they can vote in as many suggestions as they want, but only once
//once a place reaches the majority of the votes (half the users + 1) take voting system out for that board, display all the essential boards, they will have the same structure as the destination board

//ADDING BOARDS
//when user clicks the + button a new board will be generated, like an essential board, with voting system

//they can navigate between the boards using icons with onClick

//FUNCTIONS SHOULD GO TO APP (as Adam mentioned)
// !!!!! THESE FUNCTION SHOULD GO TO APP !!!!! 

//Pop Up
// function to make a pop up appear when a button is clicked
// initial state should be:
// popUpButton: false
// this will be used to add user in TripDetails and open the new trip form in TripDashboard

popUp = event => {
    event.preventDefault();

    if (this.state.popUpButton === false) {
        this.setState({
            popUpButton: true
        })
    } else if (this.state.popUpButton === true) {
        this.setState({
            popUpButton: false
        })
    }
}

class TripDetails extends Component {
    constructor() {
        super();
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="tripDetails">
                {/* SITE MUST HAVE A GLOBAL HEADER TOO, router? */}

                {/* TRIP DETAILS HEADER START */}
                <header className="tripDetails__header header">
                    {/* make country prop */}
                    <h2 className="header__heading header__heading--h2">Trip to {this.props.country}</h2>

                    {/* make type prop */}
                    <h3 className="header__heading header__heading--h3">{this.props.type}</h3>
                </header>

                {/* GROUP START */}
                <aside className="tripDetails__aside group">
                    {//this prop should point to an array with this group members info
                    this.props.groupMembers.forEach(member => {
                        return (
                            <div className="group__member">
                                <div className="group__photoContainer">
                                    <img src={member.photoURL} alt={`API_URL/${member.name}`} className="group__photo"/>
                                </div>

                                <p className="group__name">{member.name}</p>
                            </div>
                        )
                    });
                    }

                    {/* make popUp prop to pass popUp function */}
                    <button onClick={this.props.popUp} className="group__button">Add a Friend</button>

                    {
                    // make props for popUpButton
                    this.state.popUpButton
                    ? (
                        <div className="popUp">
                            <h3 className="popUp__heading">Add a Friend</h3>

                            <form className="popUp__form" action="">
                                <label htmlFor="addFriend" className="popUp__label">Your friend's email</label>
                                <input type="email" id="addFriend" className="popUp__input" onChange={this.props.handleChange}required/>
                            </form>
                        </div>
                    )
                    :
                    (
                        <div className="popUp popUp--hidden">                        
                        </div>
                    )
                    }
                    
                </aside>

                



            </div>
        );
    }
}

export default TripDetails;

//*****NOTES*****
//main header should be the same for both group and details, with logout option under the user's icon/photo