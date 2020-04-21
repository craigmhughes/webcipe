const axios = require('axios').default;
import React, {useState, useEffect} from 'react';

export default function IngredientList({  props, getDb }){

    const [ingredients, setIngredients] = useState(null);

    async function getIngredients(){
        const db = await getDb();
        return await db.getAllFromIndex('ingredients', 'id');
    }

    async function clearIngredients() {
        const db = await getDb();

        for(let ingredient of await db.getAllFromIndex('ingredients','id')){
            await db.delete('ingredients', ingredient.id);
        }

        setIngredients(null);
    }

    useEffect(() => {
        getIngredients().then(res => {
            if(ingredients === null){setIngredients(res)}
        });
        
    },[ingredients]);

    let ingredientEls = [];

    if(ingredients !== null){
        for(let ingredient of ingredients){
            ingredientEls.push(<li key={ingredients.indexOf(ingredient)} className="show-recipe__recipe-ingredient"><p>{ingredient.name}<span>{ingredient.quantity} {ingredient.measurement ?? null}</span></p></li>);
        }
    }
    

    return (
        <article className="saved-recipes">
            <header className="saved-recipes__header">
                <h1 className="saved-recipes__title">View Ingredients</h1>
                <button onClick={()=>clearIngredients()} className="saved-recipes__clear-button"><img src="/assets/icons/bin-alt.svg"/>Clear Ingredients</button>
            </header>
            <main>
                <ul className="saved-recipes__recipe-list">
                    {ingredientEls}
                </ul>
            </main>
        </article>
    );
}