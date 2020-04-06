// require('./bootstrap');
const axios = require('axios').default;

import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch, } from "react-router-dom";

// Components
import Auth from './components/Auth.js';
import Navigation from './components/Navigation.js';

export default function App (){

    // Control blur state of app when menu is active. Pass to components as to not blur the whole app.
    const [menuActive, setActiveMenu] = useState(false);

    // On Component Mount
    useEffect(()=>{
        // If token exists, use it to look up user details.
        if(localStorage.auth_token){
            axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.auth_token}`};

            axios.get('api/auth/user').then((res)=>{
                if(!res.data.name){
                    return false;
                }

                localStorage.setItem("user", JSON.stringify(res.data));
            })
            .catch(()=>localStorage.removeItem("auth_token"));
        } else {
            localStorage.removeItem("user");
        }
    },[]);

    return (
        <Router>
            <Route exact path="/login" render={(props)=><Auth props={props}/>} />
            <div></div>
            <Navigation setActiveMenu={setActiveMenu} blur={menuActive}/>
        </Router>
    );
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
