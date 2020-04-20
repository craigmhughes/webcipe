const axios = require('axios').default;
import React, {useState, useEffect} from 'react';


export default function Saved({  props, setShowRecipe, getDb }){

    const [recipes, setRecipes] = useState(null);

    // UNCOMMENT WHEN ABLE TO PULL IN USERS RECIPES
    // function getRecipes(){
    //     axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.auth_token}`};

    //     axios.get('/api/auth/recipes')
    //         .then((res)=> {if(res.data.recipes){setRecipes(res.data.recipes)}})
    //         .catch((err)=>console.error(res));
    // }

    async function getRecipes(){
        const db = await getDb();
        return await db.getAllFromIndex('recipes', 'id');
    }

    useEffect(() => {
        getRecipes().then(res => {
            if(recipes === null){setRecipes(res)}
        });
        
    },[recipes]);

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