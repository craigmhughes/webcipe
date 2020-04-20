const axios = require('axios').default;
import React, {useState, useEffect} from 'react';

export default function Explore({  props, setShowRecipe }){

    const [recipes, setRecipes] = useState(null);

    function getRecipes(){
        axios.get('/api/recipes')
            .then((res)=> {if(res.data.recipes){
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
        <article className="saved-recipes">
            <header className="saved-recipes__header">
                <h1 className="saved-recipes__title">View Recipes</h1>
            </header>
            <main>
                <ul className="saved-recipes__recipe-list">
                    {recipeEls}
                </ul>
            </main>
        </article>
    );
}