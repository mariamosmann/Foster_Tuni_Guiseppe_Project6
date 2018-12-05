import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Qs from 'qs';
// import activitiesArray from './activitiesArray.js'


class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: ""
        }
    }
    componentDidMount() {
        const apiKey = `YwiudiYi5fC5MKG0gh9W52CLVdfxeGhP`
        const userInput = prompt();

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
                    location: `${userInput}`,
                    outFormat: JSON,
                    thumbMaps: true,
                },
                xmlToJSON: false
            }
        }).then((response) => {
            console.log(response.data.results[0].locations);
            this.setState({
                userInput
            })
        })
    }
    render() {
        return (
            <div className="App">

            </div>
        );
    }
}


export default LandingPage;