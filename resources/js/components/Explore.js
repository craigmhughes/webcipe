const axios = require('axios').default;
import React, {useState, useEffect} from 'react';

export default function Explore({  props, setShowRecipe }){

    const [recipes, setRecipes] = useState(null);

    function getRecipes(){
        axios.get('/api/recipes')
            .then((res)=> {if(res.data.recipes){
                console.log(res.data.recipes);
                setRecipes(res.data.recipes);
            }})
            .catch((err)=>console.error(res));
    }

    useEffect(() => {
        getRecipes();
    }, []);

    let recipeEls = [];
    if(recipes !== null){
        for(let recipe of recipes){
            recipeEls.push(<li key={recipe.id} onClick={()=>setShowRecipe(recipe, props)}>{recipe.title}</li>);
        }
    }
    

    return (
        <main className="saved">
            <h1 className="saved__title">View Recipes</h1>
            <ul>
                {recipeEls}
            </ul>
        </main>
    );
}