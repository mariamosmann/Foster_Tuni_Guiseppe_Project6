import React, { Component } from 'react';
// import "./styles/style.scss";
import arrowUp from "./assets/arrowUp.svg";
import arrowDown from "./assets/arrowDown.svg";
import activitiesArray from './activitiesArray.js';

class TripDetails extends Component {
    constructor() {
        super();
        this.state = {
            groupMembers: [],
            cities: [
                {
                    city: "",
                    type: "",
                    votes: 0,
                }
            ],
            hotel: [],
            food: [
                {
                    city: "",
                    suggestion: "",
                    type: "",
                    votes: 0,
                }
            ],
            tourism: [
                {
                    city: "",
                    suggestion: "",
                    type: "",
                    votes: 0,
                }
            ],
            shopping: [
                {
                    city: "",
                    suggestion: "",
                    type: "",
                    votes: 0,
                }
            ],
            nightlife: [
                {
                    city: "",
                    suggestion: "",
                    type: "",
                    votes: 0,
                }
            ],
            typeChoices: activitiesArray,
            citySuggestion: "",
            typeSuggestion: "",
            selectedCities: [],
            hotelCity: "",
            hotelSuggestion: "",
            hotelType: "",
            foodCity: "",
            foodSuggestion: "",
            foodType: "",
            tourismCity: "",
            tourismSuggestion: "",
            tourismType: "",
            shoppingCity: "",
            shoppingSuggestion: "",
            shoppingType: "",
            nightlifeCity: "",
            nightlifeSuggestion: "",
            nightlifeType: "",
            selectedEmail: "",
            emailChoice: [],
        }
    }

    //handle change
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

        //cloning the array
        const addingVote = Array.from(this.state.cities)

        //adding a vote to the array
        addingVote[event.target.className].votes++

        //updating the array
        this.setState({
            cities: addingVote
        })

        //creating a variable to determine majority of votes
        const stopVotes = Math.floor(this.state.groupMembers.length / 2 + 1);

        //checking if city already have enough votes to be pushed to the selectedCities array
        if (addingVote[event.target.className].votes === stopVotes) {
            //if it has enough votes:

            //cloning the array
            const addingSelectedCity = Array.from(this.state.selectedCities)

            //pushing the city to the array
            addingSelectedCity.push(this.state.cities[event.target.className])

            //updating the array
            this.setState({
                selectedCities: addingSelectedCity
            })
        }
    }

    //subtract vote
    //subtract votes until it reaches the majority of votes
    subtractVote = (event) => {

        //creating a variable for how many votes it has
        const totalVotes = this.state.cities[event.target.className].votes;

        //not allowing votes do go below 0
        if (totalVotes > 0) {
            //cloning the array
            const subtractingVote = Array.from(this.state.cities)

            //subtracting a vote from the array
            subtractingVote[event.target.className].votes--

            //updating the array
            this.setState({
                cities: subtractingVote
            })
        }
    }

    addHotel = event => {
        event.preventDefault();

        //cloning the array
        const newHotel = Array.from(this.state.hotel)

        //adding the new city
        newHotel.push({
            city: this.state.hotelCity,
            suggestion: this.state.hotelSuggestion,
            type: this.state.hotelType,
            votes: 0,
        });

        //updating the array
        this.setState({
            hotel: newHotel
        })

        //reseting
        this.setState({
            hotelCity: "",
            hotelSuggestion: "",
            hotelType: ""
        })
    }

    addVoteHotel = (event) => {
        //conditions on what's rendering before a city reaches majority of votes and after is already set on render       

        //cloning the array
        const addingVote = Array.from(this.state.hotel)

        //adding a vote to the array
        addingVote[event.target.className].votes++

        //updating the array
        this.setState({
            hotel: addingVote
        })
    }

    subtractVoteHotel = (event) => {

        //creating a variable for how many votes it has
        const totalVotes = this.state.hotel[event.target.className].votes;

        //not allowing votes do go below 0
        if (totalVotes > 0) {
            //cloning the array
            const subtractingVote = Array.from(this.state.hotel)

            //subtracting a vote from the array
            subtractingVote[event.target.className].votes--

            //updating the array
            this.setState({
                hotel: subtractingVote
            })
        }
    }
    chooseEmail = (e) => {

        const emailChoice = this.state.selectedEmail

        if (emailChoice !== "") {
            this.setState({
                emailChoice: [...this.state.emailChoice, emailChoice],
                selectedEmail: "",
            })

        }
    }
    render() {
        return (
            <div className="tripDetails">
                <header className="tripDetails__header header">
                    {/* displaying the country and the type of trip that the user chose */}
                    <h2 className="header__heading header__heading--h2">Trip to {this.props.country}</h2>

                    <h3 className="header__heading header__heading--h3">{this.props.type}</h3>
                </header>

                <div className="boards">
                    {/* CITIES START */}
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

                                                <p className="option__type">{item.type}</p>

                                                {/* +1 voting button */}
                                                <div className="option__addVote">
                                                    <img onClick={this.addVote} src={arrowUp} alt="" className={i}
                                                        key={i} id="option__addIcon"
                                                    />
                                                </div>

                                                {/* -1 voting button */}
                                                <div className="option__subtractVote">
                                                    <img onClick={this.subtractVote} src={arrowDown} alt="" alt="" className={i}
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

                                <label htmlFor="typeSuggestion">Type of trip:</label>
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
                    {/* CITIES END */}

                    {/* HOTEL START */}
                    <div className="boards__board board">
                        <h4 className="board__heading board__heading--h4">Suggest Hotel:</h4>

                        <div className="board__voting">
                            {//display every city/type inside cities array in state so users can vote
                                this.state.hotel.map((item, i) => {

                                    //creating a variable to determine majority of votes
                                    const stopVotes = Math.floor(this.state.groupMembers.length / 2 + 1);

                                    if (this.state.hotel[i].votes === stopVotes) {

                                        return (
                                            <div className="board__option option">
                                                <p className="option__title option__title--selected">{item.city}</p>

                                                <p className="option__title option__title--selected">{item.suggestion}</p>

                                                <p className="option__type option__type--selected">{item.type}</p>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className="board__option option">
                                                <p className="option__title">{item.city}</p>

                                                <p className="option__suggestion">{item.suggestion}</p>

                                                <p className="option__type">{item.type}</p>

                                                {/* +1 voting button */}
                                                <div className="option__addVote">
                                                    <img onClick={this.addVoteHotel} src={arrowUp} alt="" className={i}
                                                        key={i} id="option__addIcon"
                                                    />
                                                </div>

                                                {/* -1 voting button */}
                                                <div className="option__subtractVote">
                                                    <img onClick={this.subtractVoteHotel} src={arrowDown} alt="" alt="" className={i}
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
                            <p className="add__text">Add hotel to be voted:</p>

                            <form onSubmit={this.addHotel} action="" className="add__form">
                                <label htmlFor="hotelCity">City:</label>
                                <select
                                    defaultValue="hotelCity"
                                    name="hotelCity"
                                    id="hotelCity"
                                    className="add__city"
                                    onChange={this.handleChange}
                                    required>
                                    <option disabled="disabled" selected="selected" value="hotelCity">--City--</option>
                                    {this.state.selectedCities.map((item) => {
                                        return (
                                            <option key={item.city} value={item.city}>{item.city}</option>
                                        )
                                    })}
                                </select>

                                <label htmlFor="hotelSuggestion" className="add__label visuallyhidden">Suggest a hotel to stay.</label>
                                <input
                                    type="text"
                                    id="hotelSuggestion"
                                    className="add__suggestion"
                                    placeholder="Hotel"
                                    onChange={this.handleChange}
                                    value={this.state.hotelSuggestion}
                                />

                                <label htmlFor="hotelType">Type of trip:</label>
                                <select
                                    defaultValue="hotelType"
                                    name="hotelType"
                                    id="hotelType"
                                    className="add__type"
                                    onChange={this.handleChange}
                                    required>
                                    <option disabled="disabled" selected="selected" value="hotelType">--Type--</option>
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
                    {/* HOTEL END */}
                    {/* ADD FRIEND FORM START */}
                    <form className="tripForm tripForm--friends" action="submit">
                        <input type="email" name="selectedEmail" onChange={this.handleChange} />
                        <input type="reset" name="addAnotherEmail" onClick={this.chooseEmail} value="Add another" />
                    </form>
                    {/* ADD FRIEND FORM ENDS */}
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
                    type: this.props.type,
                    votes: 0,
                }
            ]
        })
    }
}

export default TripDetails;





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