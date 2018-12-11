import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Qs from 'qs';
import activitiesArray from './activitiesArray.js'
import firebase from './firebase.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TripDetails from './TripDetails.js'

// GOOGLE API KEY = `AIzaSyBgY9n1Rn6S8uuQtKGrJUf__sb1itP5p5U`
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
            //IMAGE
            placeImage: "",
            //USER STATES
            user: null,
            // groupMembers: null
            currentTrip: null
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
            //target.value IS THE VALUE OF THE INPUT
            //Sets the state value to include the value of the input
            [e.target.name]: e.target.value

        });
    }
    selectInput = (e) => {

            e.preventDefault();

            const apiKey = `AIzaSyBgY9n1Rn6S8uuQtKGrJUf__sb1itP5p5U`
            const userInput = this.state.selectedCountry;
            let globalID = new Date().getTime();
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
                        reqUrl: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
                        params: {
                            input: userInput,
                            key: apiKey,
                            sessiontoken: globalID
                        },
                        xmlToJSON: false
                    }
                }).then((response) => {
                    const placeID = response.data.predictions[0].place_id
                    //SPECIFIES OUR DATA TO THE AREA WE NEED

                    axios({
                        method: 'GET',
                        url: "http://proxy.hackeryou.com",
                        dataResponse: JSON,
                        paramsSerializer: function (params) {
                            return Qs.stringify(params, { arrayFormat: 'brackets' })
                        },
                        params: {
                            reqUrl: "https://maps.googleapis.com/maps/api/place/details/json",
                            params: {
                                place_id: placeID,
                                key: apiKey,
                                inputtype: "textquery",
                                fields: "address_components,formatted_address,types,name"
                            },
                            xmlToJSON: false
                        }
                    }).then((response) => {
                        const city = response.data.result.address_components[0].long_name;
                        const country = response.data.result.address_components[3].long_name;

                        this.setState({
                            country,
                            city,
                            userInput: "",
                        })

                        // axios({
                        //     method: 'GET',
                        //     url: "http://proxy.hackeryou.com",
                        //     // dataResponse: JSON,
                        //     paramsSerializer: function (params) {
                        //         return Qs.stringify(params, { arrayFormat: 'brackets' })
                        //     },
                        //     params: {
                        //         reqUrl: "https://maps.googleapis.com/maps/api/place/photo",
                        //         params: {
                        //             key: apiKey,
                        //             photoreference: photoReference,
                        //             maxwidth: 1200,
                        //             sensor: false,
                        //             // inputtype: "textquery",
                        //             // fields: "address_components,formatted_address,types,name,photos"
                        //         },
                        //         xmlToJSON: false
                        //     }
                        // }).then((response) => {
                        //     const placeImage = response.data

                        //     this.setState({
                        //         placeImage,
                        //     })
                        //     console.log(this.state.placeImage)
                        // })
                    })
                })
            }
        }
    chooseType = (e) => {
        e.preventDefault();
        // const countryChoice = this.state.country
        const typeInput = this.state.selectedType;
        //STOPS EMPTY INPUTS
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
        //STOPS EMPTY INPUTS

        //RIGHT NOW YOU HAVE TO SELECT A START DATE BUT NOT AN END DATE, WHY?
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
        //STOPS EMPTY INPUTS

        //RIGHT NOW YOU HAVE TO SELECT A START DATE BUT NOT AN END DATE, WHY?
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
            this.setState ({
                publicChoice,
                selectedPublic: "",
            })
        }

    }
    logIn = () => {
        auth.signInWithPopup(provider).then(result => {
           
            
            if (result){
                console.log("First", result)
                this.setState({
                user: result.user
            });
                // if (this.state.user === null) {
                //     dbRef.ref(`/Users/Guest}`).update({
                //         displayName: 'Guest',
                //         trips: `${this.state.country}`
                //     })
                // }
                // if (result.additionalUserInfo.isNewUser){
                    console.log(result, 'result')
                    dbRef.ref(`/Users/${result.user.uid}`).set({
                        displayName: result.user.displayName,
                        email: result.user.email,
                        photoURL: result.user.photoURL,
                        // trips: `${this.state.country}`
                    })
                // }
            }
        });
    //     if(this.state.user === null){
    //         dbRef.ref(`/Users/Guest}`).update({
    //             displayName: 'Guest',
    //             trips: `${this.state.country}`
    //     })
    // }
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

        // dbRef.ref(`/Catagories/${this.state.typeInput}`).push(
        //     trip
        // );
        // console.log(dbRef.ref(`/Users/${this.state.user.uid}/trips`).push(
        //     trip
        // ))
        const currentTripID =dbRef.ref(`/Users/${this.state.user.uid}/trips`).push(
            trip
        );
        this.setState({
            currentTrip: currentTripID.path.pieces_[3]
        })
        console.log(currentTripID)
        this.props.history.push('/details')

        // this.duplicateTripsToCollab(trip);

    }
    // goToDetails = (e) =>{
    //     e.preventDefault();
    //     console.log('going to details')
    //         this.props.history.push('/details')
    // }    
    
    render() {
        const startForm = this.state.country === "";
        const submitLocation = (this.state.country !== "") && (this.state.typeInput === "");
        const submitType = (this.state.typeInput !== "") && (this.state.startDate === "");
        const submitStartDate = (this.state.startDate !== "") && (this.state.endDate === "");
        const submitEndDate = (this.state.endDate !== "") && (this.state.submitEmail === "");
        const submitEmail = (this.state.submitEmail === "yes") && (this.state.publicChoice === "") ;
        const submitPublic = this.state.publicChoice !== "";

        return (
            <div className="BuildTripForm">
                {/* THIS FORM WILL BE FOR THE COUNTRY, SEARCH THE DATA BASE AND RETURN THE COUNTRY CODE */}
                <header>
                    {this.state.user ? (
                        <button onClick={this.logOut}>Logout</button>
                    ) : (
                        <button onClick={this.logIn}>Login</button>
                        )}
                        <button onClick={this.guest}>Use As Guest</button>
                      
                </header>
                {startForm
                ? <form className="tripForm tripForm--country" action="submit">
                    <label htmlFor="selectedCountry" className="visuallyhidden">Input the country you wish to travel to.</label>
                    <input type="text/javascript" name="selectedCountry" id="selectedCountry" placeholder="Enter country" onChange={this.handleChange} className="autocomplete "required />
                    <input type="submit" value="Continue" onClick={this.selectInput} />
                </form>
                : <form className="visuallyhidden"></form>
                }
                
                {/* THIS FORM WILL LET THE USER CHOOSE THE TRIP TYPE */}
                {submitLocation
                    ? <form className="tripForm tripForm--type" action="submit">
                        <label htmlFor="selectedType">Choose the type of trip you wish to take:</label>
                        <select defaultValue="selectedType" name="selectedType" id="selectedType"
                            onChange={this.handleChange} required>
                            <option disabled="disabled" selected="selected" value="selectedType">--Type of trip--</option>
                            {this.state.typeChoices.map((type) => <option key={type} value={type}>{type}</option>)}
                        </select>
                        
                        <input type="submit" value="Continue" onClick={this.chooseType} />
                    </form>
                    : <form className="visuallyhidden"></form>
                }
                {/* THESE FORMS WILL LET YOU SELECT DATES */}
                {submitType
                    ? <form className="tripForm tripForm--startDate" action="submit">
                        <label htmlFor="selectedStartDate">Choose the starting date of the trip you wish to plan</label>
                        {/* SHOULD THIS BE REQUIRED OR CAN THEY SET UP A TRIP WITHOUT A DATE? RIGHT NOW IT WILL LET THEM NOT CHOOSE AN END DATE BUT THEY DO NEED TO CHOOSE A START DATE*/}
                        <input type="date" id="selectedStartDate" name="selectedStartDate" onChange={this.handleChange} />
                        <input type="submit" value="Continue" onClick={this.chooseStartDate} />
                    </form>
                    : <form className="visuallyhidden"></form>
                }
                {/* SHOULD THIS BE REQUIRED OR CAN THEY SET UP A TRIP WITHOUT A DATE? RIGHT NOW IT WILL LET THEM NOT CHOOSE AN END DATE BUT THEY DO NEED TO CHOOSE A START DATE*/}
                {submitStartDate
                ? <form className="tripForm tripForm--endDate" action="submit">
                    <label htmlFor="selectedEndDate">Choose the ending date of the trip you wish to take.</label>
                    <input type="date" id="selectedEndDate" name="selectedEndDate" onChange={this.handleChange} min={this.state.selectedStartDate} />
                    <input type="submit" value="Continue" onClick={this.chooseEndDate} />
                </form>
                : <form className="visuallyhidden"></form>
                }
                {submitEndDate
                ? <form className="tripForm tripForm--friends"action="submit">
                    <input type="email" name="selectedEmail" onChange={this.handleChange}/>
                    <input type="reset" name="addAnotherEmail" onClick={this.chooseEmail} value="Add another"/>
                    <input type="submit" value="Continue" onClick={this.setEmails}/>
                </form> 
                : <form className="visuallyhidden"></form>
                }
                {/* ADD INTO THE NUMBER OF PEOPLE YOU WOULD LIKE TO ADD IN BEFORE YOU ADD THEM IN */}
                {submitEmail
                ? <form className="tripForm tripForm--public" action="submit">
                    <label htmlFor="publicYes">Public
                        <input type="radio" name="selectedPublic" value="public" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="publicNo">Private
                        <input type="radio" name="selectedPublic" value="private" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Continue" onClick={this.choosePublic}/>
                </form>
                : <form className="visuallyhidden"></form>
                }
                {submitPublic
                    ? <form action="submit" onSubmit={this.sendToFirebase}>
                    <h2>Your proposed {this.state.typeInput} trip to {this.state.country}</h2>
                    <h3>You will begin in {this.state.city}</h3>
                    <p>You will propose to start on {this.state.startDate} and end on {this.state.endDate}</p>
                    <ul>You will invite:{this.state.emailChoice.map((email) => <li>{email}</li>)}</ul>
                    <p>This trip will be {this.state.publicChoice}</p>
                    <input type="submit" value="Create trip"/>
                </form>
                : <form className="visuallyhidden"></form>
                }
                {/* DO WE WANT A FORM THAT WILL ALLOW US TO CHOOSE FROM THE STARTING CATAGORIES */}
                {/* <Route to='/details' 
                    render = { () => (<TripDetails
                        country={this.state.country}
                        city={this.state.city}
                        type={this.state.typeInput}
                        groupMembers={this.state.selectedType.country.country.users}
                        popUp={this.popUp}
                        popUpButton={this.state.popUpButton}
                        inviteFriend={this.state.setEmails}
                  />
                  )} /> */}
                    
                    
                              
            </div>
        )
    }
}


export default BuildTripForm;

// axios({
//     method: 'GET',
//     url: "http://proxy.hackeryou.com",
//     dataResponse: JSON,
//     paramsSerializer: function (params) {
//         return Qs.stringify(params, { arrayFormat: 'brackets' })
//     },
//     params: {
//         reqUrl: "https://maps.googleapis.com/maps/api/place/photo",
//         params: {
//             photoreference: photoReference,
//             key: apiKey,
//             maxwidth: 500,
//         },
//         xmlToJSON: false
//     }
// }).then((response) => {
//     const photo = response.data

//     this.setState({
//         photo,
//     })
//     console.log(response)
// })