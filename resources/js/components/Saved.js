const axios = require('axios').default;
import React, {useState, useEffect} from 'react';

export default function Saved(){

    const [recipes, setRecipes] = useState(null);

    function getRecipes(){
        axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.auth_token}`};

        axios.get('/api/recipes/user')
            .then((res)=> {if(res.data.recipes){setRecipes(res.data.recipes)}})
            .catch((err)=>console.error(res));
    }

    useEffect(() => {
        getRecipes();
    }, []);

    let recipeEls = [];
    if(recipes !== null){
        for(let recipe of recipes){
            recipeEls.push(<li key={recipe.id}>{recipe.title}</li>);
        }
    }
    

    return (
        <main className="saved">
            <h1 className="saved__title">My Recipes</h1>
            <ul>
                {recipeEls}
            </ul>
        </main>
    );
}