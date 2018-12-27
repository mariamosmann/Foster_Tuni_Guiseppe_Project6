import React, { Component } from 'react';
import './App.css';
// import firebase from './firebase.js';
import Logo from './assets/logo.svg'

// const dbRef = firebase.database();

class MainNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            toggleList: "",
        }
    }
    componentDidMount() {
        //HOW DO I PULL AND SET THE STATE OF THE USER FROM THE DB
    }
    toggleList = () => {
        
        if (this.state.toggleList === "") {
            this.setState({
                toggleList: "yes",
            })
        } else {
            this.setState({
                toggleList: "",
            })
        }
    }
    render() {
        const toggleList = this.state.toggleList !== ""
        return (
            //I SHOULD HAVE THIS IN THE APP AND IT SHOULD INCLUDE THE LOG IN PAGE AND THEN IT CAN PASS THE USER DOWN TO THE COMPONENTS AS A PROP SO WE CAN ALL HAVE IT RIGHT?
            <div className="MainNav">
                <header className="mainHeader">
                    <h1 className="visuallyhidden">Synchronicity</h1>
                    <nav className="mainHeader__nav wrapper clearfix">                       
                        {/* ADD IN ON CLICK DROP DOWN INFO WITH THEIR WHOLE USER, EASIER TO BUILD WITH THE INFO PASSING */}
                        <p className="mainHeader__nav__logo">
                            <span className="mainHeader__nav__logo--start">synchroni</span><span className="mainHeader__nav__logo--end">C<img aria-hidden="true" src={Logo} alt="synchronicity: building img by Rudez Studio from the Noun Project https://thenounproject.com/rudezstudio/collection/building-and-manufacturing/" className="mainHeader__nav__logo--img" />TY</span>
                        </p>
                        {/* <div className="mainHeader__nav__trips">
                            <div className="mainHeader__nav__trips__item" onClick={this.toggleList}>{this.state.user.name}'s trips
                            {toggleList
                            ? <ul>
                                <li className="mainHeader__nav__trips__item--type">Test</li>
                                <li className="mainHeader__nav__trips__item--cities">test</li>
                                <li className="mainHeader__nav__trips__item--dates">test</li>
                                <li className="mainHeader__nav__trips__item--users">test</li>
                                <li className="mainHeader__nav__trips__item--public">test</li>
                            </ul>
                            : <ul className="visuallyhidden"></ul>
                            }  
                            </div> */}
                        
                    </nav>
                </header>
            </div>
        );
    }
}

export default MainNav;