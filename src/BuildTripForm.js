import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Qs from 'qs';
import activitiesArray from './activitiesArray.js'
import firebase from './firebase.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TripDetails from './TripDetails.js';
// import MainNav from './MainNav.js'

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const dbRef = firebase.database();


class BuildTripForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

            //COUNTRY STATES
            selectedCountry: "",
            userInput: "",
            country: '',
            city: "",
            //TYPE STATES
            typeChoices: activitiesArray,
            selectedType: {
                country: {
                    country: '',
                    users: ''
                }
            },
            typeInput: "",
            //DATE STATES
            selectedStartDate: "",
            startDate: "",
            selectedEndDate: "",
            endDate: "",
            //EMAIL STATES
            selectedEmail: "",
            emailChoice: [],
            submitEmail: "",
            //PUBLIC STATES
            selectedPublic: "",
            publicChoice: "",
            //MAP STATE
            cityMap: "",
            //USER STATES
            user: null,
            // groupMembers: null
            currentTrip: '',
            otherUsers: [],
            showForm: true,
        }
    }
    componentDidMount() {

        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState(
                    {
                        user: user
                    },
                    () => {
                        this.dbRef = firebase.database().ref(`/Users/${this.state.user.uid}`);
                        this.dbRef.on("value", snapshot => {
                            console.log(snapshot.val(), 'looking for snapshot')
                            this.setState({
                                selectedCountry: snapshot.val() || {},
                                selectedType: snapshot.val() || {},
                                // user: snapshot.val() || {},


                            });
                        });

                    }
                );
            }
        });
    }
    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        });
    }
    selectInput = (e) => {

        e.preventDefault();

        const apiKey = `YwiudiYi5fC5MKG0gh9W52CLVdfxeGhP`
        const userInput = this.state.selectedCountry;
        // let globalID = new Date().getTime();
        if (userInput !== '') {
            this.setState({
                userInput,
                selectedCountry: '',
            })

            axios({
                method: 'GET',
                url: "http://proxy.hackeryou.com",
                dataResponse: JSON,
                paramsSerializer: function (params) {
                    return Qs.stringify(params, { arrayFormat: 'brackets' })
                },
                params: {
                    reqUrl: 'http://www.mapquestapi.com/geocoding/v1/address',
                    params: {
                        key: apiKey,
                        location: userInput,
                        outFormat: JSON,
                        thumbMaps: true,
                    },
                    xmlToJSON: false
                }
            }).then((response) => {
                const country = response.data.results[0].locations[0].adminArea1
                const city = response.data.results[0].locations[0].adminArea5
                const cityMap = response.data.results[0].locations[0].mapUrl

                this.setState({
                    country,
                    city,
                    cityMap,
                    userInput: "",
                })
            })

            // axios({
            //     method: 'GET',
            //     url: "http://proxy.hackeryou.com",
            //     dataResponse: JSON,
            //     paramsSerializer: function (params) {
            //         return Qs.stringify(params, { arrayFormat: 'brackets' })
            //     },
            //     params: {
            //         reqUrl: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
            //         params: {
            //             input: userInput,
            //             key: apiKey,
            //             sessiontoken: globalID
            //         },
            //         xmlToJSON: false
            //     }
            // }).then((response) => {
            //     const placeID = response.data.predictions[0].place_id
            //     //SPECIFIES OUR DATA TO THE AREA WE NEED

            //     axios({
            //         method: 'GET',
            //         url: "http://proxy.hackeryou.com",
            //         dataResponse: JSON,
            //         paramsSerializer: function (params) {
            //             return Qs.stringify(params, { arrayFormat: 'brackets' })
            //         },
            //         params: {
            //             reqUrl: "https://maps.googleapis.com/maps/api/place/details/json",
            //             params: {
            //                 place_id: placeID,
            //                 key: apiKey,
            //                 inputtype: "textquery",
            //                 fields: "address_components,formatted_address,types,name"
            //             },
            //             xmlToJSON: false
            //         }
            //     }).then((response) => {
            //         const city = response.data.result.address_components[0].long_name;
            //         const country = response.data.result.address_components[3].long_name;

            //         this.setState({
            //             country,
            //             city,
            //             userInput: "",
            //         })
            //     })
            // })
        }
    }
    chooseType = (e) => {
        e.preventDefault();
        // const countryChoice = this.state.country
        const typeInput = this.state.selectedType;

        if (typeInput !== '') {
            this.setState({
                typeInput,
                selectedType: ""
            })
        };
    }
    chooseStartDate = (e) => {
        e.preventDefault();

        const startDate = this.state.selectedStartDate;

        if (startDate !== "") {
            this.setState({
                startDate,
                selectedStartDate: "",
            })
        }
    }
    chooseEndDate = (e) => {
        e.preventDefault();

        const endDate = this.state.selectedEndDate;

        if (endDate !== "") {
            this.setState({
                endDate,
                selectedEndDate: "",
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
        // firebase.database().ref().child("Other").orderByChild("email").equalTo(emailChoice).once("value", function (snapshot) {
        //             snapshot.forEach(function (child) {
        //                 child.firebase.database().ref().update(updateData);
        //             });
        //         });


    }
    setEmails = (e) => {
        e.preventDefault();

        const emailChoice = this.state.selectedEmail


        if (emailChoice !== "") {
            this.setState({
                emailChoice: [...this.state.emailChoice, emailChoice],
                selectedEmail: "",
                submitEmail: "yes"
            })
        } else {
            this.setState({
                submitEmail: "yes"
            })
        }

    }
    choosePublic = (e) => {
        e.preventDefault();

        const publicChoice = this.state.selectedPublic

        if (publicChoice !== "") {
            this.setState({
                publicChoice,
                selectedPublic: "",
            })
        }

    }
    logIn = () => {
        auth.signInWithPopup(provider).then(result => {


            if (result) {
                console.log("First", result)
                this.setState({
                    user: result.user
                });

                if (result.additionalUserInfo.isNewUser) {
                    dbRef.ref(`/Users/${result.user.uid}`).set({
                        displayName: result.user.displayName,
                        email: result.user.email,
                    })
                }
            }
        });
    }
    logOut = () => {
        auth.signOut().then(() => {
            this.setState({
                user: null
            });
        });
    };
    // duplicateTripsToCollab = (trip) => {
    //     trip.users.forEach(function(email) {
    //         dbRef.ref().child("Users").orderByChild("email").equalTo(email).once("value", function (snapshot) {
    //             snapshot.forEach(function (child) {
    //                 dbRef.ref(`/Users/${child.ref_.path.pieces_[1]}/trips`).push(trip);
    //                 console.log(child, "child")
    //             });
    //         });
    //     })
    // }
    guest = () => {

        this.setState({
            user: {
                uid: "Guest",
                displayName: "Guest",
                email: "N/A"
            }
        })
    }
    sendToFirebase = (e) => {
        e.preventDefault();

        const trip = {
            users: [...this.state.emailChoice, this.state.user.email],
            type: this.state.typeInput,
            country: this.state.country,
            city: this.state.city,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            public: this.state.publicChoice,
        }

        const currentTripID = dbRef.ref(`/Users/${this.state.user.uid}/trips`).push(
            trip
        );

        this.setState({
            currentTrip: currentTripID.path.pieces_[3]
        }, () => {
            const otherUsersRef = dbRef.ref(`/Users/${this.state.user.uid}/trips/${this.state.currentTrip}/users`)
            otherUsersRef.on('value', snapshot => {
                const userArray = snapshot.val()
                this.setState({
                    otherUsers: userArray,
                    showForm: false
                }, () => {
                    this.props.history.push('/details')
                })
            })
        })

    }

    render() {
        const nextPage = this.state.showForm === true;
        //FORM CONDITIONS FOR RENDERING OPERATORS
        const logInOrGuest = this.state.user === null;
        const startForm = (this.state.country === "") && (this.state.user !== null);
        const submitLocation = (this.state.country !== "") && (this.state.typeInput === "");
        const submitType = (this.state.typeInput !== "") && (this.state.startDate === "");
        const submitStartDate = (this.state.startDate !== "") && (this.state.endDate === "");
        const submitEndDate = (this.state.endDate !== "") && (this.state.submitEmail === "");
        const submitEmail = (this.state.submitEmail === "yes") && (this.state.publicChoice === "");
        const submitPublic = this.state.publicChoice !== "";

        const addCountryDetails = this.state.country !== "";
        const addTypeDetails = this.state.typeInput !== "";
        const addEndDateDetails = this.state.endDate !== "";
        const addEmailDetails = this.state.submitEmail === "yes";
        const addPublicDetails = this.state.publicChoice !== "";
        const mapConnect = {
            backgroundImage: `url(${this.state.cityMap})`,
            // background: `linear-gradient(black,black,white)`,
            backgroundSize: `cover`,
            backgroundPosition: `center`,
        };

        return (
            <div className="BuildTripForm clearfix" style={mapConnect}>
                {logInOrGuest
                    ? <div className="visuallyhidden"></div>
                    : <button onClick={this.logOut} className="logOut">Logout</button>
                }
                {logInOrGuest
                    ? <div className="tripForm tripForm--logIn">
                        <button onClick={this.logIn}>Login</button>
                        <button onClick={this.guest}>Use As Guest</button>
                    </div>
                    : <button className="visuallyhidden"></button>
                }
                {nextPage && this.state.showForm
                    ? (<div className="wrapper clearfix">
                        {startForm && this.state.showForm
                            ? <form className="tripForm tripForm--country" action="submit" autocomplete="off">
                                <label htmlFor="selectedCountry">Enter the starting city in the country you wish to travel to.</label>
                                <input type="text/javascript" name="selectedCountry" id="selectedCountry" placeholder="Enter starting city" onChange={this.handleChange} spellcheck="true" className="tripForm__middleInput" required />
                                <input type="submit" value="Continue" onClick={this.selectInput} />
                            </form>
                            : <form className="visuallyhidden"></form>
                        }

                        {/* THIS FORM WILL LET THE USER CHOOSE THE TRIP TYPE */}
                        {submitLocation && this.state.showForm
                            ? <form className="tripForm tripForm--type" action="submit">
                                <label htmlFor="selectedType">Choose the type of trip you wish to take:</label>
                                <select defaultValue="selectedType" name="selectedType" id="selectedType"
                                    onChange={this.handleChange} className="tripForm__middleInput" required>
                                    <option disabled="disabled" selected="selected" value="selectedType">--Type of trip--</option>
                                    {this.state.typeChoices.map((type) => <option key={type} value={type}>{type}</option>)}
                                </select>
                                <input type="submit" value="Continue" onClick={this.chooseType} />
                            </form>
                            : <form className="visuallyhidden"></form>
                        }
                        {/* THESE FORMS WILL LET YOU SELECT DATES */}
                        {submitType && this.state.showForm
                            ? <form className="tripForm tripForm--startDate" action="submit">
                                <label htmlFor="selectedStartDate">Choose the starting date of the trip you wish to plan</label>
                                {/* SHOULD THIS BE REQUIRED OR CAN THEY SET UP A TRIP WITHOUT A DATE? RIGHT NOW IT WILL LET THEM NOT CHOOSE AN END DATE BUT THEY DO NEED TO CHOOSE A START DATE*/}
                                <input type="date" id="selectedStartDate" name="selectedStartDate" onChange={this.handleChange} className="tripForm__middleInput" />
                                <input type="submit" value="Continue" onClick={this.chooseStartDate} />
                            </form>
                            : <form className="visuallyhidden"></form>
                        }
                        {/* SHOULD THIS BE REQUIRED OR CAN THEY SET UP A TRIP WITHOUT A DATE? RIGHT NOW IT WILL LET THEM NOT CHOOSE AN END DATE BUT THEY DO NEED TO CHOOSE A START DATE*/}
                        {submitStartDate && this.state.showForm
                            ? <form className="tripForm tripForm--endDate" action="submit">
                                <label htmlFor="selectedEndDate">Choose the ending date of the trip you wish to take.</label>
                                <input type="date" id="selectedEndDate" name="selectedEndDate" onChange={this.handleChange} min={this.state.selectedStartDate} className="tripForm__middleInput" />
                                <input type="submit" value="Continue" onClick={this.chooseEndDate} />
                            </form>
                            : <form className="visuallyhidden"></form>
                        }
                        {submitEndDate && this.state.showForm
                            ? <form className="tripForm tripForm--friends" action="submit">
                                <label htmlFor="selectedEndDate">Type in the emails of the friends you wish to invite.</label>
                                <input type="email" name="selectedEmail" onChange={this.handleChange} className="tripForm__middleInput" />
                                <input type="reset" name="addAnotherEmail" onClick={this.chooseEmail} value="Add another" className="tripForm--friends--bottom" />
                                <input type="submit" value="Continue" onClick={this.setEmails} />
                            </form>
                            : <form className="visuallyhidden"></form>
                        }
                        {/* ADD INTO THE NUMBER OF PEOPLE YOU WOULD LIKE TO ADD IN BEFORE YOU ADD THEM IN */}
                        {submitEmail && this.state.showForm
                            ? <form className="tripForm tripForm--public" action="submit">
                                <label htmlFor="publicYes">Public</label>
                                <input type="radio" name="selectedPublic" value="public" onChange={this.handleChange} className="radioInput radioInput--first" />
                                <label htmlFor="publicNo">Private</label>
                                <input type="radio" name="selectedPublic" value="private" onChange={this.handleChange} className="radioInput radioInput--last" />
                                <input type="submit" value="Continue" onClick={this.choosePublic} />
                            </form>
                            : <form className="visuallyhidden"></form>
                        }
                        {/* FORM TO SEND THE DATA TO FIREBASE*/}
                        {submitPublic && this.state.showForm
                            ? <form className="tripForm tripForm--complete" action="submit">
                                <label htmlFor="complete" className="visuallyhidden">Create trip</label>
                                <input type="submit" name="complete" value="Create trip" onClick={this.sendToFirebase} className="tripForm__middleInput" />
                            </form>
                            : <form className="visuallyhidden"></form>
                        }

                        {/* FORM THAT WILL DISPLAY THE TRIP DETAILS AFTER ENTERING THEM */}
                        <aside className="tripDetails" >
                            <h2>Trip details</h2>
                            {addCountryDetails
                                ? <div className="tripDetails__title">
                                    <h3>Destination country: <span className="non-bold">{this.state.country}</span></h3>
                                    <h3>Starting cocation: <span className="non-bold">{this.state.city}</span></h3>
                                </div>
                                : <div className="visuallyhidden"></div>
                            }
                            {addTypeDetails
                                ? <p><span className="bold">Type of trip:</span> {this.state.typeInput}</p>
                                : <p className="visuallyhidden"></p>
                            }
                            {addEndDateDetails
                                ? <ul><span className="bold">Dates:</span>
                                    <li><span className="bold">From -</span> {this.state.startDate}</li>
                                    <li><span className="bold">To -</span> {this.state.endDate}</li>
                                </ul>
                                : <ul className="visuallyhidden"></ul>
                            }
                            {addEmailDetails
                                ? <ul><span className="bold">Friends:</span> {this.state.emailChoice.map((email) => <li>{email}</li>)}</ul>
                                : <ul className="visuallyhidden"></ul>
                            }
                            {addPublicDetails
                                ? <div>
                                    <p><span className="bold">Public/Private:</span> {this.state.publicChoice}</p>
                                </div>
                                : <div className="visuallyhidden"></div>
                            }
                        </aside>
                    </div>

                    )
                    : (<div>
                        {

                            this.state.showForm === false

                            &&

                            <Route path="/details"
                                render={() => (
                                    <TripDetails
                                        country={this.state.country}
                                        city={this.state.city}
                                        type={this.state.typeInput}
                                        groupMembers={this.state.otherUsers}
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                    />
                                )}
                            />

                        }
                    </div>)
                }
                {/* THIS FORM WILL BE FOR THE COUNTRY, SEARCH THE DATA BASE AND RETURN THE COUNTRY CODE */}


            </div>
        )
    }
}


export default BuildTripForm;

