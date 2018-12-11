import React, { Component } from 'react';
import './App.css';
import activitiesArray from './activitiesArray.js'

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
                    votes: 0,
                    whoVoted: []
                }
            ],
            typeChoices: activitiesArray,
            citySuggestion: "",
            typeSuggestion: "",
            selectedCities: [],
            thisUser: "" //user IUD
        }
    }
    componentDidMount() {
        console.log(this.props.groupMembers, 'its')
        this.setState({
            // adding the initial group members to this component array
            groupMembers: this.props.groupMembers,
            //adding the city that the group creator chose in the first form, it has to be an array
            cities: [
                {
                    city: this.props.city,
                    type: this.props.type,
                    votes: 0,
                    whoVoted: []
                }
            ]
        })
    }

    //handle change
    //couldn't figure out how to make it work as a prop, added here
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    //add city
    //adding a city to our cities array
    addCity = event => {
        event.preventDefault();

        //cloning the array
        const newCities = Array.from(this.state.cities)

        //adding the new city
        newCities.push({
            city: this.state.citySuggestion,
            type: this.state.typeSuggestion,
            votes: 0,
            whoVoted: []
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

    //add vote
    //adding votes until it reaches the majority of votes
    addVote = (event) => {
        //conditions on what's rendering before a city reaches majority of votes and after is already set on render       

        //checking if user voted
        const checkUser = this.state.cities[event.target.className].whoVoted.filter((user) => {
            return user === this.state.thisUser
        })

        //if user didn't vote, let them vote
        if (checkUser[0] != this.state.thisUser) {

            //cloning the array
            const addingVote = Array.from(this.state.cities)

            //adding a vote to the array
            addingVote[event.target.className].votes++

            //adding user to list of those who voted
            addingVote[event.target.className].whoVoted.push(this.state.thisUser)

            //updating the array
            this.setState({
                cities: addingVote
            })

            //creating a variable to determine majority of votes
            const stopVotes = Math.floor(this.state.groupMembers.length / 2 + 1);

            //checking if city already have enough votes to be pushed to the selectedCities array
            if (addingVote[event.target.className].votes === stopVotes) {
                //if it has enough votes

                //cloning the array
                const addingSelectedCity = Array.from(this.state.selectedCities)

                //pushing the city to the array
                addingSelectedCity.push(this.state.cities[event.target.className])

                //updating the array
                this.setState({
                    selectedCities: addingSelectedCity
                })
            }
        } else {
            alert("You already voted!")
        }
    }

    //subtract vote
    //subtract votes until it reaches the majority of votes
    subtractVote = (event) => {

        //checking if user voted
        const checkUser = this.state.cities[event.target.className].whoVoted.filter((user) => {
            return user === this.state.thisUser
        })

        //creating a variable for how many votes it has
        //MAKE THIS IN A WAY THAT WORKS BETTER FOR EVERY BOARD
        const totalVotes = this.state.cities[event.target.className].votes;

        //not allowing votes do go below 0
        if (totalVotes > 0) {
            // if user didn't downvote, let them
            if (checkUser[0] != this.state.thisUser) {

                //cloning the array
                const subtractingVote = Array.from(this.state.cities)

                //subtracting a vote from the array
                subtractingVote[event.target.className].votes--

                //adding user to list of those who voted
                subtractingVote[event.target.className].whoVoted.push(this.state.thisUser)

                //updating the array
                this.setState({
                    cities: subtractingVote
                })
            } else {
                alert("You already voted!")
            }
        }
    }

    render() {
        return (
            <div className="tripDetails">
                <header className="tripDetails__header header">
                    {/* displaying the country and the type of trip that the user chose */}
                    <h2 className="header__heading header__heading--h2">Trip to {this.props.country}</h2>

                    <h3 className="header__heading header__heading--h3">{this.props.typeInput}</h3>
                </header>

                <aside className="aside__group group">
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
                                    <h3 className="popUp__heading popUp__heading--h3">Invite a Friend</h3>

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
                                    <div className="popUp__closeButton">
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
                    <div className="boards__board board">
                        <h4 className="board__heading board__heading--h4">Where are we going?</h4>

                        <div className="board__voting">
                            {//display every city/type inside cities array in state so users can vote
                                this.state.cities.map((item, i) => {

                                    //creating a variable to determine majority of votes
                                    const stopVotes = Math.floor(this.state.groupMembers.length / 2 + 1);

                                    if (this.state.cities[i].votes === stopVotes) {

                                        return (
                                            <div className="board__option option">
                                                <p className="option__title option__title--selected">{item.city}</p>

                                                <p className="option__type option__type--selected">{item.type}</p>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className="board__option option">
                                                <p className="option__title">{item.city}</p>

                                                {/* +1 voting button */}
                                                <div className="option__addVote">
                                                    <img onClick={this.addVote} src="https://cdn0.iconfinder.com/data/icons/large-glossy-icons/64/Apply.png" alt="" className={i}
                                                        key={i} id="option__addIcon"
                                                    />
                                                </div>

                                                <p className="option__type">{item.type}</p>

                                                {/* -1 voting button */}
                                                <div className="option__subtractVote">
                                                    <img onClick={this.subtractVote} src="http://www.clker.com/cliparts/x/W/f/4/C/s/close-button-th.png" alt="" alt="" className={i}
                                                        key={i} id="option__subtractIcon"
                                                    />
                                                </div>

                                                <p className="option__votes">{item.votes}</p>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>

                        {/* ADD OPTION START */}
                        <div className="board__add add">
                            <p className="add__text">Add city to be voted:</p>

                            <form onSubmit={this.addCity} action="" className="add__form">
                                <label htmlFor="citySuggestion" className="add__label visuallyhidden">Suggest a city to visit.</label>
                                <input
                                    type="text"
                                    id="citySuggestion"
                                    className="add__city"
                                    placeholder="City"
                                    onChange={this.handleChange}
                                    value={this.state.citySuggestion}
                                />

                                <label htmlFor="typeSuggestion">Choose the type of trip you wish to take:</label>
                                <select
                                    defaultValue="typeSuggestion"
                                    name="typeSuggestion"
                                    id="typeSuggestion"
                                    className="add__type"
                                    onChange={this.handleChange}
                                    required>
                                    <option disabled="disabled" selected="selected" value="typeSuggestion">--Type of trip--</option>
                                    {this.state.typeChoices.map((type) => {
                                        return (
                                            <option key={type} value={type}>{type}</option>
                                        )
                                    })}
                                </select>

                                <input type="submit" value="Add" className="add__submit" />
                            </form>
                        </div>
                        {/* ADD OPTION END */}
                    </div>

                    {/* ADD BOARD GOES HERE */}
                </div>
            </div>
        )
    }

    // componentDidMount() {
    //     this.setState({
    //         // adding the initial group members to this component array
    //         groupMembers: this.props.groupMembers,
    //         //adding the city that the group creator chose in the first form, it has to be an array
    //         cities: [
    //             {
    //                 city: this.props.city,
    //                 type: this.props.type,
    //                 votes: 0,
    //                 whoVoted: []
    //             }
    //         ]
    //     })
    // }
}

export default TripDetails;

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
    typeInput={this.state.userChoice.typeInput}
    groupMembers={this.state.typeInput.country.users}
    popUp={this.popUp}
    popUpButton={this.state.popUpButton}
    inviteFriend={this.state.setEmails}
/> */