import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';



class GoogleTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //COUNTRY STATES
            selectedCountry: "",
            countryInput: "",
            countryData: "",
        }
    }
    handleChange = (e) => {
        this.setState({
            //target.value IS THE VALUE OF THE INPUT
            //Sets the state value to include the value of the input
            [e.target.name]: e.target.value
        })
    }
    selectCountryInput = (e) => {

        e.preventDefault();

        const apiKey = `AIzaSyBgY9n1Rn6S8uuQtKGrJUf__sb1itP5p5U`
        const countryInput = this.state.selectedCountry;
        let globalID = new Date().getTime();
        if (countryInput !== '') {
            this.setState({
                countryInput,
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
                input: countryInput,
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
                const photoReference = response.data.result.photos[0].photo_reference
                const city = response.data.result.address_components[0].long_name
                const country = response.data.result.address_components[3].long_name
                
                this.setState({
                    country,
                    city
                })

                console.log(this.state.country, this.state.city)
            })
        })
    }
}    
    render() {
        return (
             <form className="tripForm countryForm" action="submit">
                    <label htmlFor="selectedCountry" className="visuallyhidden">Input in City, Country format of the place you wish to visit.</label>
                <input type="text" name="selectedCountry" id="selectedCountry" placeholder="City, (State), Country" onChange={this.handleChange} required />
                    <input type="submit" value="Submit" onClick={this.selectCountryInput} />
            </form>
        );
    }
}

export default GoogleTest

// const photoReference = response.data.candidates[0].photos[0].photo_reference