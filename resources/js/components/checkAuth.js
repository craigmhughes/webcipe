const axios = require('axios').default;

export default function checkAuth(){
    axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.auth_token}`};

    axios.get('api/auth/user').then((res)=>{
        if(!res.data.name){
            return false;
        }
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
    })
    .catch(()=>localStorage.removeItem("auth_token"));
}