import React, { Component } from 'react';
import './App.css';
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
            food: [],
            tourism: [],
            shopping: [],
            nightlife: [],
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
    addFood = event => {
        event.preventDefault();

        //cloning the array
        const newFood = Array.from(this.state.food)

        //adding the new city
        newFood.push({
            city: this.state.foodCity,
            suggestion: this.state.foodSuggestion,
            type: this.state.foodType,
            votes: 0,
        });

        //updating the array
        this.setState({
            food: newFood
        })

        //reseting
        this.setState({
            foodCity: "",
            foodSuggestion: "",
            foodType: ""
        })
    }

    addVoteFood = (event) => {
        //conditions on what's rendering before a city reaches majority of votes and after is already set on render       

        //cloning the array
        const addingVote = Array.from(this.state.food)

        //adding a vote to the array
        addingVote[event.target.className].votes++

        //updating the array
        this.setState({
            food: addingVote
        })
    }

    subtractVoteFood = (event) => {

        //creating a variable for how many votes it has
        const totalVotes = this.state.food[event.target.className].votes;

        //not allowing votes do go below 0
        if (totalVotes > 0) {
            //cloning the array
            const subtractingVote = Array.from(this.state.food)

            //subtracting a vote from the array
            subtractingVote[event.target.className].votes--

            //updating the array
            this.setState({
                food: subtractingVote
            })
        }
    }
    addTourism = event => {
        event.preventDefault();

        //cloning the array
        const newTourism = Array.from(this.state.tourism)

        //adding the new city
        newTourism.push({
            city: this.state.tourismCity,
            suggestion: this.state.tourismSuggestion,
            type: this.state.tourismType,
            votes: 0,
        });

        //updating the array
        this.setState({
            tourism: newTourism
        })

        //reseting
        this.setState({
            tourismCity: "",
            tourismSuggestion: "",
            tourismType: ""
        })
    }
    addVoteTourism = (event) => {
        //conditions on what's rendering before a city reaches majority of votes and after is already set on render       

        //cloning the array
        const addingVote = Array.from(this.state.tourism)

        //adding a vote to the array
        addingVote[event.target.className].votes++

        //updating the array
        this.setState({
            tourism: addingVote
        })
    }
    subtractVoteTourism = (event) => {

        //creating a variable for how many votes it has
        const totalVotes = this.state.tourism[event.target.className].votes;

        //not allowing votes do go below 0
        if (totalVotes > 0) {
            //cloning the array
            const subtractingVote = Array.from(this.state.tourism)

            //subtracting a vote from the array
            subtractingVote[event.target.className].votes--

            //updating the array
            this.setState({
                tourism: subtractingVote
            })
        }
    }
    addShopping = event => {
        event.preventDefault();

        //cloning the array
        const newShopping = Array.from(this.state.shopping)

        //adding the new city
        newShopping.push({
            city: this.state.shoppingCity,
            suggestion: this.state.shoppingSuggestion,
            type: this.state.shoppingType,
            votes: 0,
        });

        //updating the array
        this.setState({
            shopping: newShopping
        })

        //reseting
        this.setState({
            shoppingCity: "",
            shoppingSuggestion: "",
            shoppingType: ""
        })
    }
    addVoteShopping = (event) => {
        //conditions on what's rendering before a city reaches majority of votes and after is already set on render       

        //cloning the array
        const addingVote = Array.from(this.state.shopping)

        //adding a vote to the array
        addingVote[event.target.className].votes++

        //updating the array
        this.setState({
            shopping: addingVote
        })
    }
    subtractVoteShopping = (event) => {

        //creating a variable for how many votes it has
        const totalVotes = this.state.shopping[event.target.className].votes;

        //not allowing votes do go below 0
        if (totalVotes > 0) {
            //cloning the array
            const subtractingVote = Array.from(this.state.shopping)

            //subtracting a vote from the array
            subtractingVote[event.target.className].votes--

            //updating the array
            this.setState({
                shopping: subtractingVote
            })
        }
    }
    addNightlife = event => {
        event.preventDefault();

        //cloning the array
        const newNightlife = Array.from(this.state.nightlife)

        //adding the new city
        newNightlife.push({
            city: this.state.nightlifeCity,
            suggestion: this.state.nightlifeSuggestion,
            type: this.state.nightlifeType,
            votes: 0,
        });

        //updating the array
        this.setState({
            nightlife: newNightlife
        })

        //reseting
        this.setState({
            nightlifeCity: "",
            nightlifeSuggestion: "",
            nightlifeType: ""
        })
    }
    addVoteNightlife = (event) => {
        //conditions on what's rendering before a city reaches majority of votes and after is already set on render       

        //cloning the array
        const addingVote = Array.from(this.state.nightlife)

        //adding a vote to the array
        addingVote[event.target.className].votes++

        //updating the array
        this.setState({
            nightlife: addingVote
        })
    }

    subtractVoteNightlife = (event) => {

        //creating a variable for how many votes it has
        const totalVotes = this.state.nightlife[event.target.className].votes;

        //not allowing votes do go below 0
        if (totalVotes > 0) {
            //cloning the array
            const subtractingVote = Array.from(this.state.nightlife)

            //subtracting a vote from the array
            subtractingVote[event.target.className].votes--

            //updating the array
            this.setState({
                nightlife: subtractingVote
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
                    <h2 className="header__heading header__heading--h2">You're going to {this.props.country}!</h2>

                    <h4 className="header__heading header__heading--h4">From {this.props.startDate} - {this.props.endDate}</h4>

                    <h4 className="header__heading header__heading--h4">To experience {this.props.type}</h4>
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
                                <label htmlFor="citySuggestion" className="add__label visuallyhidden">Suggest a city:</label>
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
                        <h4 className="board__heading board__heading--h4">Suggest hotel:</h4>

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

                                <label htmlFor="hotelSuggestion" className="add__label visuallyhidden">Suggest a hotel:</label>
                                <input
                                    type="text"
                                    id="hotelSuggestion"
                                    className="add__suggestion"
                                    placeholder="Hotel"
                                    onChange={this.handleChange}
                                    value={this.state.hotelSuggestion}
                                />

                                <label htmlFor="hotelType">Type:</label>
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


                    {/* FOOD START */}
                    <div className="boards__board board">
                        <h4 className="board__heading board__heading--h4">Suggest restaurant:</h4>

                        <div className="board__voting">
                            {//display every city/type inside cities array in state so users can vote
                                this.state.food.map((item, i) => {

                                    //creating a variable to determine majority of votes
                                    const stopVotes = Math.floor(this.state.groupMembers.length / 2 + 1);

                                    if (this.state.food[i].votes === stopVotes) {

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
                                                    <img onClick={this.addVoteFood} src={arrowUp} alt="" className={i}
                                                        key={i} id="option__addIcon"
                                                    />
                                                </div>

                                                {/* -1 voting button */}
                                                <div className="option__subtractVote">
                                                    <img onClick={this.subtractVoteFood} src={arrowDown} alt="" alt="" className={i}
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
                            <p className="add__text">Add restaurant to be voted:</p>

                            <form onSubmit={this.addFood} action="" className="add__form">
                                <label htmlFor="foodCity">City:</label>
                                <select
                                    defaultValue="foodCity"
                                    name="foodCity"
                                    id="foodCity"
                                    className="add__city"
                                    onChange={this.handleChange}
                                    required>
                                    <option disabled="disabled" selected="selected" value="foodCity">--City--</option>
                                    {this.state.selectedCities.map((item) => {
                                        return (
                                            <option key={item.city} value={item.city}>{item.city}</option>
                                        )
                                    })}
                                </select>

                                <label htmlFor="foodSuggestion" className="add__label visuallyhidden">Suggest a restaurant:</label>
                                <input
                                    type="text"
                                    id="foodSuggestion"
                                    className="add__suggestion"
                                    placeholder="Restaurant"
                                    onChange={this.handleChange}
                                    value={this.state.foodSuggestion}
                                />

                                <label htmlFor="foodType">Type:</label>
                                <select
                                    defaultValue="foodType"
                                    name="foodType"
                                    id="foodType"
                                    className="add__type"
                                    onChange={this.handleChange}
                                    required>
                                    <option disabled="disabled" selected="selected" value="foodType">--Type--</option>
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
                    {/* FOOD END */}

                    {/* TOURISM START */}
                    <div className="boards__board board">
                        <h4 className="board__heading board__heading--h4">Suggest place to visit:</h4>

                        <div className="board__voting">
                            {//display every city/type inside cities array in state so users can vote
                                this.state.tourism.map((item, i) => {

                                    //creating a variable to determine majority of votes
                                    const stopVotes = Math.floor(this.state.groupMembers.length / 2 + 1);

                                    if (this.state.tourism[i].votes === stopVotes) {

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
                                                    <img onClick={this.addVoteTourism} src={arrowUp} alt="" className={i}
                                                        key={i} id="option__addIcon"
                                                    />
                                                </div>

                                                {/* -1 voting button */}
                                                <div className="option__subtractVote">
                                                    <img onClick={this.subtractVoteTourism} src={arrowDown} alt="" alt="" className={i}
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
                            <p className="add__text">Add place to be voted:</p>

                            <form onSubmit={this.addTourism} action="" className="add__form">
                                <label htmlFor="tourismCity">City:</label>
                                <select
                                    defaultValue="tourismCity"
                                    name="tourismCity"
                                    id="tourismCity"
                                    className="add__city"
                                    onChange={this.handleChange}
                                    required>
                                    <option disabled="disabled" selected="selected" value="tourismCity">--City--</option>
                                    {this.state.selectedCities.map((item) => {
                                        return (
                                            <option key={item.city} value={item.city}>{item.city}</option>
                                        )
                                    })}
                                </select>

                                <label htmlFor="tourismSuggestion" className="add__label visuallyhidden">Suggest a place to visit:</label>
                                <input
                                    type="text"
                                    id="tourismSuggestion"
                                    className="add__suggestion"
                                    placeholder="Place"
                                    onChange={this.handleChange}
                                    value={this.state.tourismSuggestion}
                                />

                                <label htmlFor="tourismType">Type:</label>
                                <select
                                    defaultValue="tourismType"
                                    name="tourismType"
                                    id="tourismType"
                                    className="add__type"
                                    onChange={this.handleChange}
                                    required>
                                    <option disabled="disabled" selected="selected" value="tourismType">--Type--</option>
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
                    {/* TOURISM END */}

                    {/* SHOPPING START */}
                    <div className="boards__board board">
                        <h4 className="board__heading board__heading--h4">Suggest place to go shopping:</h4>

                        <div className="board__voting">
                            {//display every city/type inside cities array in state so users can vote
                                this.state.shopping.map((item, i) => {

                                    //creating a variable to determine majority of votes
                                    const stopVotes = Math.floor(this.state.groupMembers.length / 2 + 1);

                                    if (this.state.shopping[i].votes === stopVotes) {

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
                                                    <img onClick={this.addVoteShopping} src={arrowUp} alt="" className={i}
                                                        key={i} id="option__addIcon"
                                                    />
                                                </div>

                                                {/* -1 voting button */}
                                                <div className="option__subtractVote">
                                                    <img onClick={this.subtractVoteShopping} src={arrowDown} alt="" alt="" className={i}
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
                            <p className="add__text">Add place to be voted:</p>

                            <form onSubmit={this.addShopping} action="" className="add__form">
                                <label htmlFor="shoppingCity">City:</label>
                                <select
                                    defaultValue="shoppingCity"
                                    name="shoppingCity"
                                    id="shoppingCity"
                                    className="add__city"
                                    onChange={this.handleChange}
                                    required>
                                    <option disabled="disabled" selected="selected" value="shoppingCity">--City--</option>
                                    {this.state.selectedCities.map((item) => {
                                        return (
                                            <option key={item.city} value={item.city}>{item.city}</option>
                                        )
                                    })}
                                </select>

                                <label htmlFor="shoppingSuggestion" className="add__label visuallyhidden">Suggest a place to go shopping:</label>
                                <input
                                    type="text"
                                    id="shoppingSuggestion"
                                    className="add__suggestion"
                                    placeholder="Place"
                                    onChange={this.handleChange}
                                    value={this.state.shoppingSuggestion}
                                />

                                <label htmlFor="shoppingType">Type:</label>
                                <select
                                    defaultValue="shoppingType"
                                    name="shoppingType"
                                    id="shoppingType"
                                    className="add__type"
                                    onChange={this.handleChange}
                                    required>
                                    <option disabled="disabled" selected="selected" value="shoppingType">--Type--</option>
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
                    {/* SHOPPING END */}

                    {/* NIGHTLIFE START */}
                    <div className="boards__board board">
                        <h4 className="board__heading board__heading--h4">Suggest place to party:</h4>

                        <div className="board__voting">
                            {//display every city/type inside cities array in state so users can vote
                                this.state.nightlife.map((item, i) => {

                                    //creating a variable to determine majority of votes
                                    const stopVotes = Math.floor(this.state.groupMembers.length / 2 + 1);

                                    if (this.state.nightlife[i].votes === stopVotes) {

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
                                                    <img onClick={this.addVoteNightlife} src={arrowUp} alt="" className={i}
                                                        key={i} id="option__addIcon"
                                                    />
                                                </div>

                                                {/* -1 voting button */}
                                                <div className="option__subtractVote">
                                                    <img onClick={this.subtractVoteNightlife} src={arrowDown} alt="" alt="" className={i}
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
                            <p className="add__text">Add place to be voted:</p>

                            <form onSubmit={this.addNightlife} action="" className="add__form">
                                <label htmlFor="nightlifeCity">City:</label>
                                <select
                                    defaultValue="nightlifeCity"
                                    name="nightlifeCity"
                                    id="nightlifeCity"
                                    className="add__city"
                                    onChange={this.handleChange}
                                    required>
                                    <option disabled="disabled" selected="selected" value="nightlifeCity">--City--</option>
                                    {this.state.selectedCities.map((item) => {
                                        return (
                                            <option key={item.city} value={item.city}>{item.city}</option>
                                        )
                                    })}
                                </select>

                                <label htmlFor="nightlifeSuggestion" className="add__label visuallyhidden">Suggest a place to party:</label>
                                <input
                                    type="text"
                                    id="nightlifeSuggestion"
                                    className="add__suggestion"
                                    placeholder="Place"
                                    onChange={this.handleChange}
                                    value={this.state.nightlifeSuggestion}
                                />

                                <label htmlFor="nightlifeType">Type:</label>
                                <select
                                    defaultValue="nightlifeType"
                                    name="nightlifeType"
                                    id="nightlifeType"
                                    className="add__type"
                                    onChange={this.handleChange}
                                    required>
                                    <option disabled="disabled" selected="selected" value="nightlifeType">--Type--</option>
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
                    {/* SHOPPING END */}

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
}

export default TripDetails;
