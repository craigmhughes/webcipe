import React, {useState, useEffect} from 'react';

export default function IngredientList({  props, getDb }){

    // Ingredients object
    const [ingredients, setIngredients] = useState(null);

    // Return ingredients from IndexedDB
    async function getIngredients(){
        const db = await getDb();
        return await db.getAllFromIndex('ingredients', 'id');
    }

    // Clears all ingredients from IDB.
    async function clearIngredients() {
        const db = await getDb();

        for(let ingredient of await db.getAllFromIndex('ingredients','id')){
            await db.delete('ingredients', ingredient.id);
        }

        setIngredients(null);
    }

    // Run onc omponent  mount and on change of ingredients.
    useEffect(() => {
        getIngredients().then(res => {
            if(ingredients === null){setIngredients(res)}
        });
        
    },[ingredients]);

    // Create and fill list of elements from found ingredients.
    let ingredientEls = [];
    if(ingredients !== null){
        for(let ingredient of ingredients){
            ingredientEls.push(<li key={ingredients.indexOf(ingredient)} className="show-recipe__recipe-ingredient"><p>{ingredient.name}<span>{ingredient.quantity} {ingredient.measurement ?? null}</span></p></li>);
        }
    }
    

    return (
        <article className="explore">
            <header className="content__header">
                <h1 className="explore__main-title">View Ingredients</h1>
                <button onClick={()=>clearIngredients()} className="explore__clear-button"><img src="/assets/icons/bin-alt.svg"/>Clear Ingredients</button>
            </header>
            <main>
                <ul className="saved-recipes__recipe-list">
                    {ingredientEls}
                </ul>
            </main>
        </article>
    );
}