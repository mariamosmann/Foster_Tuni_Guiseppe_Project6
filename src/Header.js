import React, { Component } from 'react';


class Header extends Component {
    render() {
        return (
            <header>
                {this.state.user ? (
                    <button onClick={this.logOut}>Logout</button>
                ) : (
                        <button onClick={this.logIn}>Login</button>
                    )}
                <button onClick={this.guest}>Use As Guest</button>
                <h1> <Route path="/" SyncroniCITY /> </h1>
                 
            </header>
        )
    }
}

export default Header;