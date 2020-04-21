const axios = require('axios').default;
import React, {useState, useEffect} from 'react';

import {openDB} from 'idb';

export default function ShowRecipe({  props, showRecipe, getDb }){

    const [saved, setSaved] = useState(false);
    const [showIngredients, setShowIngredients] = useState(false);
    
    async function saveRecipe(){
        if(!saved){
            const db = await getDb();
            await db.add('recipes', showRecipe);
            return;
        } 
        
        return await deleteRecipe(showRecipe.id);
    }

    async function deleteRecipe(key) {
        return (await getDb()).delete('recipes', key);
    }


    // If recipe is falsy, redirect away.
    if(!showRecipe){
        props.history.push('/');
        return false;
    }

    let recipeSteps = [];
    let ingredients = [];

    for(let step of showRecipe.steps){
        recipeSteps.push(<li key={step.order} className="show-recipe__recipe-step"><h2>Step {step.order + 1}:</h2><p>{step.content}</p></li>);
    }

    for(let ingredient of showRecipe.ingredients){
    ingredients.push(<li key={showRecipe.ingredients.indexOf(ingredient)} className="show-recipe__recipe-ingredient"><p>{ingredient.name}<span>{ingredient.quantity} {ingredient.measurement ?? null}</span></p></li>);
    }

    async function checkSaved(){
        const db = await getDb();
        let foundSave = false;

        for(let recipe of await db.getAllFromIndex('recipes', 'id')){
            if(showRecipe.id === recipe.id){
                foundSave = true;
            }
        }

        setSaved(foundSave);
    }

    useEffect(()=>{
        checkSaved();
    },[]);
        

    return (
        <article className="show-recipe">
            <header className="show-recipe__header">
                <h1 className="show-recipe__title">{showRecipe.title}</h1>
                <p className="show-recipe__author">Created by: {showRecipe.author_id}</p>
                
                <div className="show-recipe__save-list" onClick={()=>saveRecipe().then(checkSaved())}>
                    <p className={`show-recipe__save-recipe${saved ? "--saved" : ""}`}>
                        <img src={`/assets/icons/bookmark.svg`}/>
                    </p>

                    <p className="show-recipe__save-ingredient">
                        <img src="/assets/icons/shopping-basket.svg"/>
                    </p>
                    
                    {/* Render Delete icon if saved */}
                    {!saved ? null :
                    <p  className="show-recipe__delete-recipe"
                        onClick={()=>{saveRecipe().then(checkSaved())}}>
                        <img src="/assets/icons/bin-alt.svg"/>
                    </p>
                    }
                </div>
            </header>
            <main>
                <section className={`show-recipe__ingredients${showIngredients ? "--expanded" : ""}`}>
                    <h2 onClick={()=>setShowIngredients(!showIngredients)}>Ingredients List <img src={`/assets/icons/chevron-${showIngredients ? "up":"down"}.svg`}/></h2>
                    <ul>
                        {ingredients}
                        {saved ? null : <p>Click the shopping basket above to save to your shopping list</p>}
                    </ul>
                </section>
                <ul className="show-recipe__recipe">
                    {recipeSteps}
                </ul>
            </main>
        </article>
    );
}