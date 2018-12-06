import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Qs from 'qs';
import activitiesArray from './activitiesArray.js'

// GOOGLE API KEY = AIzaSyBgY9n1Rn6S8uuQtKGrJUf__sb1itP5p5U


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
        }
    }
    handleChange = (e) => {
        this.setState({
            //target.value IS THE VALUE OF THE INPUT
            //Sets the state value to include the value of the input
            [e.target.name]: e.target.value
        })
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
        }
    chooseType = (e) => {
        e.preventDefault();

        const typeInput = this.state.selectedType;
        //STOPS EMPTY INPUTS
        if (typeInput !== '') {
            this.setState({
                typeInput,
                selectedType: ""
            })        
        }
    }
    chooseDate = (e) => {
        e.preventDefault();

        const startDate = this.state.selectedStartDate;
        const endDate = this.state.selectedEndDate;
        //STOPS EMPTY INPUTS

        //RIGHT NOW YOU HAVE TO SELECT A START DATE BUT NOT AN END DATE, WHY?
        if ((startDate !== "") && (endDate !== "")) {
            this.setState({
                startDate,
                endDate,
                selectedEndDate: "",
                selectedStartDate: "",
            })
        } 
    }
    render() {
        return (
            <div className="BuildTripForm">
                {/* THIS FORM WILL BE FOR THE COUNTRY, SEARCH THE DATA BASE AND RETURN THE COUNTRY CODE */}
                <form className="tripForm countryForm" action="submit">
                    <label htmlFor="selectedCountry" className="visuallyhidden">Input the country you wish to travel to.</label>
                    <input type="text" name="selectedCountry" id="selectedCountry" placeholder="Enter country" onChange={this.handleChange} required />
                    <input type="submit" value="Submit" onClick={this.selectInput} />
                </form>
                {/* THIS FORM WILL LET THE USER CHOOSE THE TRIP TYPE */}
                <form className="tripForm typeForm" action="submit">
                    <label htmlFor="selectedType">Choose the type of trip you wish to take:</label>
                    <select name="selectedType" id="selectedType"
                    onChange={this.handleChange} required>
                        <option disabled selected value>--Type of trip--</option>
                        {this.state.typeChoices.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                        <input type="submit" value="Submit" onClick={this.chooseType}/>
                </form>
                {/* THIS FORM WILL LET YOU SELECT DATES */}
                <form className="tripForm dateForm" action="submit">
                    <label htmlFor="selectedStartDate">Choose the starting date of the trip you wish to plan</label>
                    <label htmlFor="selectedEndDate">Choose the ending date of the trip you wish to take.</label>
                    {/* SHOULD THIS BE REQUIRED OR CAN THEY SET UP A TRIP WITHOUT A DATE? RIGHT NOW IT WILL LET THEM NOT CHOOSE AN END DATE BUT THEY DO NEED TO CHOOSE A START DATE*/}
                    <input type="date" id="selectedStartDate" name="selectedStartDate" onChange={this.handleChange}/>
                    <input type="date" id="selectedEndDate" name="selectedEndDate" onChange={this.handleChange} min={this.state.selectedStartDate} />
                    <input type="submit" value="Submit" onClick={this.chooseDate}/>
                </form>
                {/* THIS FORM WILL LET US CHOOSE FROM THE STARTING CATAGORIES */}

                {/* THIS FORM WILL LET US CHOOSE STARTING FRIENDS TO INVITE */}    

                {/* THIS FORM WILL GIVE THE CHOICE TO MAKE THE PROJECT PUBLIC */}
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