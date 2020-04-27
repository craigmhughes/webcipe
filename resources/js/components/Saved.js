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
            recipeEls.push(
            <li key={recipe.id} onClick={()=>setShowRecipe(recipe, props)} className="explore__recipe">
                <div style={{backgroundImage:`url('${recipe.image ? '/storage/recipe_images/' + recipe.image : '/assets/images/null.svg'}')`}} className="explore__recipe-image"></div>
                <div className="explore__recipe-info">
                    <p className="explore__recipe-title">{recipe.title}</p>
                    <p className="explore__recipe-author">By {recipe.author_id}</p>
                </div>
            </li>);
        }
    } 

    return (
        <article className="explore">
            <main>
                <h1 className="explore__main-title">Saved Recipes</h1>
                <ul className="explore__recipe-list">
                    {recipeEls}
                </ul>
            </main>
        </article>
    );
}