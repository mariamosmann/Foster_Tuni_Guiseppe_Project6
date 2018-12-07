import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
// import Qs from 'qs';
// import activitiesArray from './activitiesArray.js'

//CHANGES: COUNTRY IS SET, USERS CAN ONLY ADD CITIES IN THAT COUNTRY, THEY DON'T NEED TO ADD A REASON ANYMORE, COUNTRY AND REASON (FROM DROP DOWN) SHOULD BE DISPLAYED, EVERY CITY THAT GETS APPROVED SHOULD GO TO AN ARRAY AND APPEAR IN A DROP DOWN WHEN THEY PRESS THE + BUTTON, EVERY BOARD WILL DISPLAY A NAME AND PLACE THAT IS RELATED TO (like HOTEL - PARIS), ON TOP OF THE PRE SET LIST THAT WILL BE DISPLAYED, USERS CAN PICK A CATHEGORY FOR THAT BOARD (hotel, activities, restaurantes, shows, etc -- so it will be easiet to implement suggestions later)








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

// ***** MIGHT NOT NEED THAT, CHECK IF popUp ALONE CAN TOGGLE CORRECTLY
// closePopUp = event => {
//     event.preventDefault();

//     this.setState({
//         popUpButton: false
//     })
// }

//Add Friend
//use same functionality as add friends from when you create a group
inviteFriend = (event) => {
    //preventing the form from refreshing the page
    event.preventDefault();

    //this function should send an email invitation
    //after the user sign up, add him to this group
}

//Add City
//adding city suggestion to the board
addCity = event => {
    event.preventDefault();

    const newCity = {
        city: this.state.suggestion.item,
        type: this.state.suggestion.type,
        votes: 0
    }

    this.setState({
        cities: cities.push(newCity),
        suggestion: {
            item: "",
            type: ""
        } 
    })
}

//Add Item
//adding user suggestion to the board
// addItem = event => {
//     event.preventDefault();

//     const newSuggestion = {
//         item: this.state.suggestion.item,
//         type: this.state.suggestion.type
//     }

//     this.setState({
//         boardType: newSuggestion,
//         suggestion: {
//             item: "",
//             type: ""
//         }
//     })

// }

addVote = (event) => {
    //event.target.className will be that city index, so this.state.cities[2].votes
    const cityIndex = this.state.cities[event.target.className].votes;

    const addingVote = cityIndex + 1;

    this.setState({
        [cities[event.target.className].votes]: addingVote
    })
}

substractVote = () => {
    const cityIndex = this.state.cities[event.target.className].votes;

    const substractingVote = cityIndex - 1;

    this.setState({
        [cities[event.target.className].votes]: substractingVote  
    })
}


class TripDetails extends Component {
    constructor() {
        super();
        this.state = {
            groupMembers: [],
            friendEmail: "",
            cities: [
                {
                  city: "",
                  type: "",
                  votes: 0  
                }
            ],
            suggestion: {
                city: "",
                item: ""
            }
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
                    {this.setState({
                        groupMembers: groupMembers.push(this.props.groupMembers)
                    })}
                    {//this prop should point to an array with this group members info
                    this.groupMembers.map(member => {
                        return (
                            //BEM notes: the "user" block structure can be used when showing users anywhere in the site
                            <div className="group__member user">
                                <div className="user__photoContainer">
                                    <img src={member.photoURL} alt={member.name}} className="user__photo"/>
                                </div>

                                <p className="user__name">{member.name}</p>
                            </div>
                        )
                    })
                    }

                    {/* make popUp prop to pass popUp function */}
                    <button onClick={this.props.popUp} className="group__button">Add a Friend</button>

                    {
                    // make props for popUpButton
                    this.state.popUpButton
                    ? (
                        <div className="popUp">
                            <h3 className="popUp__heading">Invite a Friend</h3> 

                            <p className="popUp__text">Send an invitation to join this group:</p>

                            {/* make prop for inviteFriend */}
                            <form onSubmit={this.props.inviteFriend}className="popUp__form" action="">
                                <label htmlFor="friendEmail" className="popUp__label visuallyhidden">Type your friend's email.</label>
                                <input 
                                type="email" 
                                id="friendEmail" 
                                className="popUp__input" 
                                placeholder="Your friend's email"
                                onChange={this.props.handleChange} 
                                value={this.state.friendEmail}/>

                                {/* stretch goal: add by username */}
                                {/* make into component, add button to send and then go back to the form */}

                                <input type="submit" value="Invite" className="popUp__submit"/>
                            </form>

                            <div className="popUp__close">
                                <img onClick={this.props.popUp} src="" alt="" className="popUp__icon"/>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="popUp popUp--hidden">                        
                        </div>
                    )
                    }                    
                </aside>
                {/* GROUP END */}
                
                {/* BOARDS START */}
                <div className="boards">
                    {/* CITIES START */}
                    <div className="boards__board">

                        <h4 className="boards__heading boards__heading--h4">Where are we going?</h4>

                        {/* VOTING START */}
                        {/* Displaying the first city and the other cities for voting */}
                        <div className="boards__voting">                    
                            {//will this work?
                                //add a city prop (array with an object containing city and type), so it can show what user already entered as the first one
                                this.setState({
                                    cities: cities.push(this.props.city)
                                })                
                            }

                            {//display every city/type inside cities array in state so users can vote
                            this.cities.map(item => {
                                return (
                                    <div className="boards__option option">
                                        <p className="option__title">{item.city}</p>

                                        <div className="option__voteButtons">
                                            {/* ICON UP*/}
                                            <img onClick={addVote} src="" alt="" className={}/>
                                            {/* ICON DOWN */}
                                            <img onClick={substractVote}src="" alt="" className={}/>
                                        </div>
                                        
                                        <p className="option__type">{item.type}</p>
                                    </div>
                                )
                            }) 
                            }
                        </div>
                        {/* VOTING END */}

                        {/* ADD OPTION START */}
                            <div className="boards__add add">
                                <p className="add__text">Add suggestion to be voted:</p>

                                <form onSubmit={this.addCity} action="" className="add__form">
                                    <label htmlFor="suggestion" className="add__label visuallyhidden">Your suggestion.</label>
                                    <input 
                                    type="text"
                                    id="suggestion"
                                    className="add__suggestion"
                                    placeholder="Your suggestion"
                                    onChange={this.props.handleChange}
                                    value={this.state.suggestion.item}
                                    />

                                    {/* DROP DOWN W/ OPTIONS */}
                                
                                    <input type="submit" value="Add" className="add__submit"/>
                                </form>                      
                            </div>
                        {/* ADD OPTION END */}
                    
                    </div>
                    {/* CITIES END */}

                </div>
                {/* BOARDS END */}

            </div>
        );
    }
}

export default TripDetails;

//*****NOTES*****
//main header should be the same for both group and details, with logout option under the user's icon/photo