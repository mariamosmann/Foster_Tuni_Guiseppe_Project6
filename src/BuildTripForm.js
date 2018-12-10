import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Qs from 'qs';
import activitiesArray from './activitiesArray.js'
import firebase from './firebase.js';

// GOOGLE API KEY = `AIzaSyBgY9n1Rn6S8uuQtKGrJUf__sb1itP5p5U`
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const dbRef = firebase.database()

class BuildTripForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //COUNTRY STATES
            selectedCountry: "",
            userInput: "",
            country: "",
            city: "",
            //TYPE STATES
            typeChoices: activitiesArray,
            selectedType: "",
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
            //USER STATES
            user: null
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
                        this.dbRef = firebase.database().ref(`/${this.state.user.uid}`);
                        this.dbRef.on("value", snapshot => {
                            this.setState({
                                selectedCountry: snapshot.val() || {},
                                selectedType: snapshot.val() || {}
                            });
                        });
                    }
                );
            }
        });
    }
    handleChange = (e) => {
        // const travelInfo = {
        //     location: this.userInput,
        //     activity: this.typeInput
        // }
        this.setState({
            //target.value IS THE VALUE OF THE INPUT
            //Sets the state value to include the value of the input
            [e.target.name]: e.target.value

        });
        // const dbRef = firebase.database().ref(`/${this.state.user.uid}`);

        // dbRef.push(travelInfo);
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
                                fields: "address_components,formatted_address,types,name,photos"
                            },
                            xmlToJSON: false
                        }
                    }).then((response) => {
                        // const photoReference = response.data.result.photos[0].photo_reference
                        const city = response.data.result.address_components[0].long_name
                        const country = response.data.result.address_components[3].long_name

                        this.setState({
                            country,
                            city,
                            userInput: "",
                        })
                    })
                })
            }
        // const dbRef = firebase.database().ref(`/${this.state.user.uid}`);

        // dbRef.push(userInput);
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
        dbRef.ref(`/${this.state.selectedType}/${this.state.country}/`).update({
            users: this.state.user.uid,
            country: this.state.country
        });
        
        //     const tripInfo = {
        //     country: countryChoice,
        //     activity: typeInput
        //     }
        // const dbRef = firebase.database().ref(`/${this.state.user.uid}`);
        
        // dbRef.push(tripInfo)
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
                console.log("First")
                this.setState({
                user: result.user
            });
                // if (this.state.user === null) {
                //     dbRef.ref(`/Users/Guest}`).update({
                //         displayName: 'Guest',
                //         trips: `${this.state.country}`
                //     })
                // }
                if (result.additionalUserInfo.isNewUser){
                    console.log(result)
                    dbRef.ref(`/Users/${result.user.uid}`).set({
                        displayName: result.user.displayName,
                        email: result.user.email,
                        photoURL: result.user.photoURL,
                        trips: `${this.state.country}`
                    })
                }
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
    sendToFirebase = (e) => {
        e.preventDefault();
    }
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
                    <input type="text" name="selectedCountry" id="selectedCountry" placeholder="Enter country" onChange={this.handleChange} required />
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
                ? <form action="submit">
                    <h2>Your proposed {this.state.typeInput}trip to {this.state.country}</h2>
                    <h3>You will begin in {this.state.city}</h3>
                    <p>You will propose to start on {this.state.startDate} and end on {this.state.endDate}</p>
                    <ul>You will invite:{this.state.emailChoice.map((email) => <li>{email}</li>)}</ul>
                    <p>This trip will be {this.state.publicChoice}</p>
                    <input type="submit" value="Create trip" onClick={this.sendToFirebase}/>
                </form>
                : <form className="visuallyhidden"></form>
                }
                {/* DO WE WANT A FORM THAT WILL ALLOW US TO CHOOSE FROM THE STARTING CATAGORIES */}              
            </div>
        );
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