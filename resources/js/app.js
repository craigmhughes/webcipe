// require('./bootstrap');
const axios = require('axios').default;

import React, { Component, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch, } from "react-router-dom";

// Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navigation from './components/Navigation.js';
import CreateRecipe from './components/CreateRecipe.js';
import ShowRecipe from './components/ShowRecipe.js';
import Saved from './components/Saved.js';
import Explore from './components/Explore.js';

// Service Workers
// import TestSW from './workers/test-sw.js';

export default function App (){

    // Control blur state of app when menu is active. Pass to components as to not blur the whole app.
    const [menuActive, setActiveMenu] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    // Pass a recipe object to edit.
    const [editRecipe, setEditRecipe] = useState(null);

    // Pass a recipe object to show.
    const [showRecipe, setShowRecipe] = useState(null);

    function updateEditRecipe(val, props){
        setEditRecipe(val);
        props.history.push('/recipes/new');
    }

    function updateShowRecipe(val, props){
        setShowRecipe(val);
        props.history.push('/recipes/view');
    }

    /**
     * Log User out & make Auth token unusable.
     *
     */
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

    /**
     * Perform check on if user is authed.
     */
    function checkAuth(){
        axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.auth_token}`};

        axios.get('api/auth/user').then((res)=>{
            if(!res.data.name){
                return false;
            }
            localStorage.setItem("user", JSON.stringify(res.data));
            setUser(res.data);
        })
        .catch(()=>{
            if(localStorage.auth_token || localStorage.user){
                localStorage.removeItem("auth_token");
                localStorage.removeItem("user");
                location.reload();
            }
        });
    }

    /**
     * Set Auth Token to be used by Auth Components.
     *
     * @param {*} token = Authorization Token
     * @param {*} props = Route props used to access history
     */
    function setToken (token, props){
        localStorage.setItem("auth_token", token);
        checkAuth();

        props.history.push("/");
    };

    // On Component Mount
    useEffect(()=>{
        setShowRecipe({
            author_id: "Laurie Bream",
            description: "test desc",
            id: 1,
            ingredients: [
                {recipe_id: 1, name: "Egg", quantity: 1, measurement: null},
                {recipe_id: 1, name: "Milk", quantity: 200, measurement: "ml"}
            ],
            steps: [
                {order: 0, content: "Add Milk to Egg"},
                {order: 1, content: "Drink"}
            ],
            title: "Easy Omlette",
            updated_at: "2020-04-10 18:03:37"
        });

        // If token exists, use it to look up user details.
        if(localStorage.auth_token){
            checkAuth();
        } else {
            localStorage.removeItem("user");
        }
    },[]);

    return (
        <Router>
            <Route exact path="/recipes/new" render={(props)=><CreateRecipe props={props} editRecipe={editRecipe} setEditRecipe={setEditRecipe}/>}/>
            <Route exact path="/" render={(props)=><ShowRecipe props={props} showRecipe={showRecipe} setShowRecipe={setShowRecipe}/>}/>

            {/* <Route exact path="/" render={(props)=><Saved props={props} setEditRecipe={updateEditRecipe}/>}/> */}
            {/* <Route exact path="/" render={(props)=><Explore props={props} setShowRecipe={updateShowRecipe}/>}/> */}

            <Route exact path="/login" render={(props)=><Login setToken={setToken} props={props}/>}/>
            <Route exact path="/register" render={(props)=><Register setToken={setToken} props={props}/>}/>
            <Navigation setActiveMenu={setActiveMenu} blur={menuActive} user={user} logout={logout}/>
        </Router>
    );
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

// Register Service Workers (Located in public dir)
if(navigator.serviceWorker){
    navigator.serviceWorker.register('./test-sw.js');
}