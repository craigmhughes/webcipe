const axios = require('axios').default;
import React, {useState, useEffect} from 'react';

export default function ShowRecipe({  props, showRecipe }){

    console.log(showRecipe);

    // If recipe is falsy, redirect away.
    if(!showRecipe){
        props.history.push('/');
        return false;
    }

    let recipeSteps = [];

    for(let step of showRecipe.steps){
        recipeSteps.push(<li className="show-recipe__recipe-step"><h2>Step {step.order + 1}:</h2><p>{step.content}</p></li>);
    }
        

    return (
        <article className="show-recipe">
            <header className="show-recipe__header">
                <h1 className="show-recipe__title">{showRecipe.title}</h1>
                <p className="show-recipe__author">Created by: {showRecipe.author_id}</p>
                
                <div className="show-recipe__save-list">
                    <p className="show-recipe__save-recipe">
                        <img src="/assets/icons/bookmark.svg"/>
                        Save Recipe
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