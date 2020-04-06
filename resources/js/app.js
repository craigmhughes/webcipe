// require('./bootstrap');
const axios = require('axios').default;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

// Components
import Auth from './components/Auth.js';

export default class App extends Component {

    render() {

        return (
            <Router className="App">
                <Route path="/login" render={()=><Auth />} />
            </Router>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
