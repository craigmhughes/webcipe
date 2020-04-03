// require('./bootstrap');
const axios = require('axios').default;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Components
import Auth from './components/Auth.js';

export default class App extends Component {

    render() {

        return (
            <div className="App">
                <Auth />
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
