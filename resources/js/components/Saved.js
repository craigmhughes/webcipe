const axios = require('axios').default;
import React, {useState, useEffect} from 'react';


export default function Saved({  props, setShowRecipe, getDb }){

    // Contains recipes found in IDB when getRecipes is called.
    const [recipes, setRecipes] = useState(null);

    // Get all saved recipes from IDB.
    async function getRecipes(){
        const db = await getDb();
        return await db.getAllFromIndex('recipes', 'id');
    }

    // Get recipes on component mount and update.
    useEffect(() => {
        getRecipes().then(res => {
            if(recipes === null){setRecipes(res)}
        });
        
    },[recipes]);

    // Create and fill list elements with the recipes found.
    let recipeEls = [];
    if(recipes !== null){
        for(let recipe of recipes){
            recipeEls.push(<li key={recipe.id} onClick={()=>setShowRecipe(recipe, props)}>{recipe.title}</li>);
        }
    }

    return (
        <article className="saved-recipes">
            <header className="saved-recipes__header">
                <h1 className="saved-recipes__title">Saved Recipes</h1>
            </header>
            <main>
                <ul className="saved-recipes__recipe-list">
                    {recipeEls}
                </ul>
            </main>
        </article>
    );
}