const axios = require('axios').default;

import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';

// Components
import Login from './Auth/Login';
import Register from './Auth/Register';
import checkAuth from '../components/checkAuth';

// TODO: store token on client and start on write up for this section.
export default function Auth({ props, setUser, user }){

    const [register, setRegister] = useState(false);

    function setToken (token){
        localStorage.setItem("auth_token", token);
        
        axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.auth_token}`};

        axios.get('api/auth/user').then((res)=>{
            if(!res.data.name){
                return false;
            }
            localStorage.setItem("user", JSON.stringify(res.data));
            setUser(res.data);
        })
        .catch(()=>localStorage.removeItem("auth_token"));

        props.history.push("/");
    };

    useEffect(() => {
        if(localStorage.user){
            setUser(checkAuth());
            props.history.push("/");
        }
    },[user]);

    return (
        <main>
            <Login setRegister={setRegister} setToken={setToken}/>
            <Register register={register} setRegister={setRegister} setToken={setToken}/>
        </main>
    );
}