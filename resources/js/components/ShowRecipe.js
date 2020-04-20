const axios = require('axios').default;
import React, {useState, useEffect} from 'react';

export default function ShowRecipe({  props, showRecipe, getDb }){

    const [saved, setSaved] = useState(false);
    
    async function saveRecipe(){
        const db = await getDb();

        showRecipe['date'] = Date.now();
        
        await db.add('recipes', showRecipe);
    }


    // If recipe is falsy, redirect away.
    if(!showRecipe){
        props.history.push('/');
        return false;
    }

    let recipeSteps = [];

    for(let step of showRecipe.steps){
        recipeSteps.push(<li key={step.order} className="show-recipe__recipe-step"><h2>Step {step.order + 1}:</h2><p>{step.content}</p></li>);
    }

    async function checkSaved(){
        const db = await getDb();
        for(let recipe of await db.getAllFromIndex('recipes', 'date')){
            if(showRecipe.id === recipe.id){
                setSaved(true);
            }
        }
    }

    useEffect(()=>{
        checkSaved();
    },[]);
        

    return (
        <article className="show-recipe">
            <header className="show-recipe__header">
                <h1 className="show-recipe__title">{showRecipe.title}</h1>
                <p className="show-recipe__author">Created by: {showRecipe.author_id}</p>
                
                <div className="show-recipe__save-list" onClick={()=>saveRecipe()}>
                    <p className={`show-recipe__save-recipe${saved ? "--saved" : ""}`}>
                        <img src={`/assets/icons/${saved ? "check" : "bookmark"}.svg`}/>
                        {saved ? "Saved" : "Save Recipe"}
                    </p>

                    <p className="show-recipe__save-ingredient">
                        <img src="/assets/icons/shopping-basket.svg"/>
                        Save Ingredient
                    </p>
                </div>
            </header>
            <main>
                <ul className="show-recipe__recipe">
                    {recipeSteps}
                </ul>
            </main>
        </article>
    );
}