import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
// import Qs from 'qs';
// import activitiesArray from './activitiesArray.js'

class TripDetails extends Component {
    constructor() {
        super();
        this.state = {
            groupMembers: [],
            friendEmail: "",
            cities: [
                {
                  city: "",
                  type: "" 
                }
            ],
            citySuggestion: "",
            typeSuggestion: ""
        }
    }

    //handle change
    //couldn't figure out how to make it work as a prop, added here
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    addCity = event => {
        event.preventDefault();

        //cloning the array
        const newCities = Array.from(this.state.cities)

        //adding the new city
        newCities.push({
            city: this.state.citySuggestion,
            type: this.state.typeSuggestion
        });

        //updating the array
        this.setState({
            cities: newCities
        })

        //reseting
        this.setState({
            citySuggestion: "",
            typeSuggestion: ""
        })
    }

    render() {
        return (
            <div className="tripDetails">
                <header className="tripDetails__header header">
                    {/* displaying the country and the type of trip that the user chose */}
                    <h2 className="header__heading header__heading--h2">Trip to {this.props.country}</h2>

                    <h3 className="header__heading header__heading--h3">{this.props.type}</h3>
                </header>

                <aside>
                    {/* mapping through this group members array to display them one by one, with photo and name */}
                    {this.state.groupMembers.map(member => {
                        return (
                            <div className="group__member user">
                                <div className="user__photoContainer">
                                    {/* keys will come from the user object that aith will provide */}
                                    <img src={member.photoURL} alt={member.name} className="user__photo" />
                                </div>

                                <p className="user__name">{member.name}</p>
                            </div>
                        )
                    })}

                    {/* button to activate a pop up window to add friends to that group */}
                    <button onClick={this.props.popUp} className="group__button">Add a Friend</button>

                    {
                        this.props.popUpButton
                            ? (
                                <div className="popUp">
                                    <h3 className="popUp__heading">Invite a Friend</h3>

                                    <p className="popUp__text">Send an invitation to join this group:</p>

                                    {/* calling the function that will send invites */}
                                    <form onSubmit={this.props.inviteFriend} className="popUp__form" action="">
                                        <label htmlFor="friendEmail" className="popUp__label visuallyhidden">Type your friend's email.</label>
                                        <input
                                            type="email"
                                            id="friendEmail"
                                            className="popUp__input"
                                            placeholder="Your friend's email"
                                            onChange={this.handleChange}
                                            value={this.state.friendEmail}
                                        />

                                        <input type="submit" value="Invite" className="popUp__submit" />
                                    </form>

                                    {/* stretch goal: add by username */}
                                    {/* make into component, add button to send and then go back to the form */}

                                    {/* button to close the pop up window */}
                                    <div className="popUp__close">
                                        <img onClick={this.props.popUp} src="http://www.clker.com/cliparts/x/W/f/4/C/s/close-button-th.png" alt="" className="popUp__icon" />
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

                <div className="boards">
                    <div className="boards__board">
                        <h4 className="boards__heading boards__heading--h4">Where are we going?</h4>

                        <div className="boards__voting">
                            {//display every city/type inside cities array in state so users can vote
                                this.state.cities.map(item => {
                                    return (
                                        <div className="boards__option option">
                                            <p className="option__title">{item.city}</p>

                                            {/* make dropdown */}
                                            <p className="option__type">{item.type}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* ADD OPTION START */}
                        <div className="boards__add add">
                            <p className="add__text">Add suggestion to be voted:</p>

                            <form onSubmit={this.addCity} action="" className="add__form">
                                <label htmlFor="suggestion" className="add__label visuallyhidden">Your suggestion.</label>
                                <input
                                    type="text"
                                    id="citySuggestion"
                                    className="add__suggestion"
                                    placeholder="Your suggestion"
                                    onChange={this.handleChange}
                                    value={this.state.citySuggestion}
                                />

                                <input
                                    type="text"
                                    id="typeSuggestion"
                                    className="add__suggestion"
                                    placeholder="Your suggestion"
                                    onChange={this.handleChange}
                                    value={this.state.typeSuggestion}
                                />

                                <input type="submit" value="Add" className="add__submit" />
                            </form>
                        </div>
                        {/* ADD OPTION END */}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {

        this.setState({
            // adding the initial group members to this component array
            groupMembers: this.props.groupMembers,
            //adding the city that the group creator chose in the first form, it has to be an array
            cities: [
                {
                    city: this.props.city,
                    type: this.props.type
                }
            ]
        })
    }
}

export default TripDetails;

//*****NOTES*****
//main header should be the same for both group and details, with logout option under the user's icon/photo

//////////////////////////////////////////
//ON APP STATE

// this.state = {
//     userChoice: {
//         country: "",
//         city: "",
//         type: ""
//     },
//     groupMembers: [ //info that auth is returning about members
//         {
//             name: "",
//             photoURL: ""
//         }
//     ],
//     popUpButton: false
// }

//////////////////////////////////////////
//APP FUNCTIONS

//Pop Up
// function to make a pop up appear when a button is clicked
// initial state in main app should be: false
// this will be used to add user in TripDetails and open the new trip form in TripDashboard

// popUp = event => {
//     event.preventDefault();

//     if (this.state.popUpButton === false) {
//         this.setState({
//             popUpButton: true
//         })
//     } else if (this.state.popUpButton === true) {
//         this.setState({
//             popUpButton: false
//         })
//     }
// }

//Invite Friend
//use same functionality as add friends from when you create a group

// inviteFriend = (event) => {
//     //preventing the form from refreshing the page
//     event.preventDefault();

//     console.log("I will work in the future!")
//     //this function should send an email invitation
//     //after the user sign up, add him to this group
// }

//////////////////////////////////////////
//ON APP RENDER

/* <TripDetails
    country={this.state.userChoice.country}
    city={this.state.userChoice.city}
    type={this.state.userChoice.type}
    groupMembers={this.state.groupMembers}
    popUp={this.popUp}
    popUpButton={this.state.popUpButton}
    inviteFriend={this.inviteFriend}
/> */