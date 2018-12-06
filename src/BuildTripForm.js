import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Qs from 'qs';
import activitiesArray from './activitiesArray.js'
import firebase from './firebase.js';


class BuildTripForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLocation: "",
            locationInput: "",
            locationData: [],
            typeChoices: activitiesArray,
            selectedType: "",
            typeInput: "",
            user: null
        }
    }
    // componentDidMount() {
        
    // }
    handleChange = (e) => {
        this.setState({
            //target.value IS THE VALUE OF THE INPUT
            //Sets the state value to include the value of the input
            [e.target.name]: e.target.value
        })
    }

    selectLocationInput = (e) => {
        
        e.preventDefault();
        //This gives us a state value when the user clicks submit that we will use to pass on to the API and return with feedback.
        const locationInput = this.state.selectedLocation;
        const apiKey = `YwiudiYi5fC5MKG0gh9W52CLVdfxeGhP`
        //STOPS EMPTY INPUTS
        if (locationInput !== '') {
            // const locationInput = this.state.selectedLocation;
            this.setState({
                locationInput,
                selectedLocation: '',
            })
            //IF THE INPUT ISNT EMPTY FETCH THE API
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
                        location: `${locationInput}`,
                        outFormat: JSON,
                        thumbMaps: true,
                    },
                    xmlToJSON: false
                }
            }).then((response) => {
                this.setState({
                    locationData: response.data.results[0].locations
                });
            })
        }
    }
    chooseType = (e) => {
        e.preventDefault();

        const typeInput = this.state.selectedType;
        //STOPS EMPTY INPUTS
        if (typeInput !== '') {
            // const locationInput = this.state.selectedLocation;
            this.setState({
                typeInput,
            })        
        }
    }
    render() {
        return (
            <div className="BuildTripForm">
                {/* I WILL BE PUTTING IN A CHANGE SO THAT ONE SMALLER BOX CAN CYCLE YOU THROUGH THE CHOICES SINCE WE WANT THEM TO BE MADETORY ANYWAY */}
                <form className="tripForm locationForm" action="submit">
                    <label htmlFor="selectedLocation" className="visuallyhidden">Input the location you wish to travel to.</label>
                    <input type="text" name="selectedLocation" id="selectedLocation" placeholder="Enter location" onChange={this.handleChange}/>
                    <input type="submit" value="Submit" onClick={this.selectLocationInput}/>
                </form>
                {/* I WILL BE PUTTING IN A CHANGE SO THAT ONE SMALLER BOX CAN CYCLE YOU THROUGH THE CHOICES SINCE WE WANT THEM TO BE MADETORY ANYWAY */}
                <form className="tripForm typeForm" action="submit">
                    <label htmlFor="selectedType">Choose the type of trip you wish to take:</label>
                    {/* HOW CAN I GET THIS TO START BLANK, THE FIRST INPUT IS NOT SENT TO THE STATE BUT IF I PUT A PLACEHOLDER IN THE AREA IT CAN BE A TYPE OF TRIP. HAVE IT NOT LETTING YOU SET STATE WITHOUT CHANGING BUT THAT DOESNT MAKE SENSE*/}
                    <select name="selectedType" id="selectedType" onChange={this.handleChange}>
                        {this.state.typeChoices.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                        <input type="submit" value="Submit" onClick={this.chooseType}/>
                </form>
                {/* I WILL BE PUTTING IN A CHANGE SO THAT ONE SMALLER BOX CAN CYCLE YOU THROUGH THE CHOICES SINCE WE WANT THEM TO BE MADETORY ANYWAY */}
                
                {/* THIS FORM WILL LET US CHOOSE FROM THE STARTING CATAGORIES */}

                {/* THIS FORM WILL LET US CHOOSE STARTING FRIENDS TO INVITE */}
                
            </div>
        );
    }
}


export default BuildTripForm;
