// require('./bootstrap');
const axios = require('axios').default;

import React, { Component, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch, } from "react-router-dom";

// Components
import Auth from './components/Auth.js';
import Navigation from './components/Navigation.js';
import checkAuth from './components/checkAuth';

export default function App (){

    // Control blur state of app when menu is active. Pass to components as to not blur the whole app.
    const [menuActive, setActiveMenu] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    function logout(){
        axios.post('/api/auth/logout')
        // Handle Login Error
        .catch((err)=>{
            console.error(err);
        }).then((resp)=>{
            localStorage.removeItem("user");
            localStorage.removeItem("auth_token");
            setUser(null);
        });
    }

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
                setUser(res.data);
            })
            .catch(()=>localStorage.removeItem("auth_token"));
        } else {
            localStorage.removeItem("user");
        }
    },[]);

    return (
        <Router>
            <Route exact path="/login" render={(props)=><Auth props={props} user={user} setUser={setUser}/>} />
            <div></div>
            <Navigation setActiveMenu={setActiveMenu} blur={menuActive} user={user} logout={logout}/>
        </Router>
    );
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
