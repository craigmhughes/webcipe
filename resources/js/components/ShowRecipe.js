import React, {useState, useEffect} from 'react';

export default function ShowRecipe({  props, showRecipe, getDb }){

    // Toggle bookmark icon highlight if recipe is saved.
    const [saved, setSaved] = useState(false);

    // Toggle basket icon highlight if ingredient list is saved.
    const [savedIngredients, setSavedIngredients] = useState(false);
    
    // Toggle show ingredients list. controls expanded state.
    const [showIngredients, setShowIngredients] = useState(false);
    
    /**
     * If recipe is unsaved, this will save to IDB.
     * If not, this will pass the current shown recipe ID to the deleteRecipe
     * function.
     */
    async function saveRecipe(){
        if(!saved){
            const db = await getDb();
            await db.add('recipes', showRecipe);
            return;
        }
        
        return await deleteRecipe(showRecipe.id);
    }

    /**
     * If ingredients list is unsaved, this will save to IDB.
     * If not, this will pass the current shown recipe ID to the deleteIngredients
     * function.
     */
    async function saveIngredients(){
        if(!savedIngredients){
            const db = await getDb();
            // Loop through and save all ingredients
            for(let ingredient of showRecipe.ingredients){
                await db.add('ingredients', ingredient);
            }
            return;
        } 
        
        return await deleteIngredients(showRecipe.id);
    }

    /**
     * Deletes Recipe from IDB based on passed key value.
     * 
     * @param {*} key = ID of currently shown recipe.
     */
    async function deleteRecipe(key) {
        return (await getDb()).delete('recipes', key);
    }

    /**
     * Deletes Ingredients from IDB based on passed key value.
     * ID is used to find if an ingredient is owned by that particular recipe.
     * 
     * @param {*} key = ID of currently shown recipe.
     */
    async function deleteIngredients(key) {
        const db = await getDb();
        let ingredientsToDelete = [];

        // Pushes identified ingredients owned by the recipe to the array for deletion.
        for(let ingredient of await db.getAllFromIndex('ingredients','id')){
            if(ingredient.recipe_id === key){
                ingredientsToDelete.push(ingredient.id);
            }
        }

        // Uses Array.filter() as this will run and delete each before returning.
        const del = await ingredientsToDelete.filter( async (id)=>{
            await db.delete('ingredients', id);
        });

        return;
    }


    // If recipe is falsy, redirect away.
    if(!showRecipe){
        props.history.push('/');
        return false;
    }

    // Create and fill list elements with the recipes and ingredients found.
    let recipeSteps = [];
    let ingredients = [];

    // Fill recipeSteps with found items.
    for(let step of showRecipe.steps){
        recipeSteps.push(<li key={step.order} className="show-recipe__recipe-step"><h2>Step {step.order + 1}:</h2><p>{step.content}</p></li>);
    }

    // Fill ingredients with found items.
    for(let ingredient of showRecipe.ingredients){
    ingredients.push(<li key={showRecipe.ingredients.indexOf(ingredient)} className="show-recipe__recipe-ingredient"><p>{ingredient.name}<span>{ingredient.quantity} {ingredient.measurement ?? null}</span></p></li>);
    }

    /**
     * Checks if recipe and ingredients are saved entries in the IDB.
     * Sets their states to true on finding an entry.
     */
    async function checkSaved(){
        const db = await getDb();
        let foundSave = false;
        let foundIngredients = false;

        for(let recipe of await db.getAllFromIndex('recipes', 'id')){
            if(showRecipe.id === recipe.id){
                foundSave = true;
            }
        }

        for(let ingredient of await db.getAllFromIndex('ingredients', 'id')){
            if(showRecipe.id === ingredient.recipe_id){
                foundIngredients = true;
            }
        }

        setSaved(foundSave);
        setSavedIngredients(foundIngredients);
    }

    // Run on component mount.
    useEffect(()=>{
        checkSaved();
    },[]);
        

    return (
        <article className="show-recipe">
            <header className="show-recipe__header">
                <h1 className="show-recipe__title">{showRecipe.title}</h1>
                <p className="show-recipe__author">Created by: {showRecipe.author_id}</p>
                
                <div className="show-recipe__save-list">
                    <p className={`show-recipe__save-recipe${saved ? "--saved" : ""}`}  onClick={()=>{saveRecipe().then(checkSaved())}}>
                        <img src={`/assets/icons/bookmark.svg`}/>
                    </p>

                    <p className={`show-recipe__save-ingredient${savedIngredients ? "--saved" : ""}`} onClick={()=>{saveIngredients().then(checkSaved())}}>
                        <img src="/assets/icons/shopping-basket.svg"/>
                    </p>
                    
                    {/* Render Delete icon if saved */}
                    {!saved ? null :
                    <p  className="show-recipe__delete-recipe"
                        onClick={()=>{deleteRecipe(showRecipe.id).then(checkSaved())}}>
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
                        {savedIngredients ? null : <p>Click the shopping basket above to save to your shopping list</p>}
                    </ul>
                </section>
                <ul className="show-recipe__recipe">
                    {recipeSteps}
                </ul>
            </main>
        </article>
    );
}