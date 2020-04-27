const axios = require('axios').default;
import React, {useState, useEffect} from 'react';

/**
 * Component showing the user's created recipes available for edit.
 *
 * @export
 * @param {*} {  props, setEditRecipe, getDb }
 * @returns
 */
export default function CreatedRecipes({  props, setEditRecipe, getDb }){

    const [recipes, setRecipes] = useState(null);

    /**
     * Fetch users recipes.
     */
    function getRecipes(){
        axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.auth_token}`};

        axios.get('/api/auth/recipes')
            .then((res)=> {if(res.data.recipes){setRecipes(res.data.recipes)}})
            .catch((err)=>console.error(res));
    }

    /**
     * Run on component mount
     */
    useEffect(() => {
        getRecipes();
    },[]);

    // Create and fill list elements with the recipes found.
    let recipeEls = [];
    if(recipes !== null){
        for(let recipe of recipes){
            recipeEls.push(
            <li key={recipe.id} onClick={()=>setShowRecipe(recipe, props)} className="explore__recipe">
                <div style={{backgroundImage:`url('/storage/recipe_images/${recipe.image ?? "null.svg"}')`}} className="explore__recipe-image"></div>
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
                <h1 className="explore__main-title">My Recipes</h1>
                <ul className="explore__recipe-list">
                    {recipeEls}
                </ul>
            </main>
        </article>
    );
}