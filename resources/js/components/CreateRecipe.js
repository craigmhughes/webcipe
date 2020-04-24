const axios = require('axios').default;

import React, {useState, useEffect} from 'react';

import Ingredient from './Recipe/Ingredient';
import Step from './Recipe/Step';

/**
 * Component rendering the form for recipe creation.
 * Will handle front end validation and pass to server on passing.
 *
 * @export
 * @param {*} {props, editRecipe, setEditRecipe}
 * @returns
 */
export default function CreateRecipe({props, editRecipe, setEditRecipe}){

    // If true, form will change from POST to PUT
    const [edit, setEdit] = useState(editRecipe);

    // Toggle error message
    const [err,setErr] = useState(false);

    // Default Form state. Will replace with edit object (recipe object).
    const [formData, setFormData] = useState(edit ?? {
        'title': null,
        'description': null,
        'ingredients': [],
        'steps': []
    });

    // Modal toggles
    const [ingredientModal, setIngredientModal] = useState(false);
    const [stepModal, setStepModal] = useState(false);

    // Object to be edited. Set to null when not in use.
    const [editIngredient, setEditIngredient] = useState(null);
    const [editStep, setEditStep] = useState(null);

    /**
     * Update formData state by overwriting the value of the passed key.
     *
     * @param {*} key Targeted key.
     * @param {*} update Add to current value if exists, else overwrite.
     */
    function updateForm(key, update, del){

        // Get Input Value
        let val = update ?? document.getElementsByName(`new-recipe__${key}`)[0].value;
        
        // Generate new form & overwrite value.
        let newForm = formData;

        if (del && update) {
            newForm[key].splice(update.idx, 1);
        } else if(update){
            newForm[key].push(update);
        } else {
            newForm[key] = val;
        }

        // Update state w/ new form.
        setFormData(newForm);
        resetEdits();
    }

    /**
     * Erase objects stored in state.
     */
    function resetEdits(){
        // Reset edit objects.
        setEditIngredient(null);
        setEditStep(null);
    }

    /**
     * Target ingredient that has been updated and replace 
     * form state with a new form including the new ingredient.
     *
     * @param {*} data = Ingredient object
     */
    function updateIngredient(data){
        let keys = ["name","quantity","measurement"];
        let newForm = formData;

        console.log(data);

        keys.forEach(key => {
            newForm.ingredients[data["idx"]][key] = data[key];
        });

        // Update state w/ new form.
        setFormData(newForm);
        resetEdits();
    }

    /**
     * Target step that has been updated and replace 
     * form state with a new form including the new step.
     *
     * @param {*} data = Step object
     */
    function updateStep(data){
        let newForm = formData;

        newForm.steps[data.order].content = data.content;

        // Update state w/ new form.
        setFormData(newForm);
        resetEdits();
    }

    /**
     * Validates form and sends via POST/PUT request to save to server.
     *
     * @returns false if form is invalid
     */
    function postRecipe(){
        axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.auth_token}`};
        let valid = true;

        let ignore = ["description"];

        // Validate data (check empty inputs)
        for(let key of Object.keys(formData)){

            if(!formData[key]) {
                valid = !ignore.includes(key) ? false : valid;
            } else if(formData[key].length < 1) {
                valid = false;
            }
        }

        if(!valid){
            setErr(true);
            setTimeout(()=>setErr(false), 6000);
            return false;
        } else {
            if(edit){
                axios.put(`/api/recipes/${formData.id}`, formData)
                .then((res)=>props.history.push('/'))
                .catch((err)=>console.error(res));
            } else {
                axios.post('/api/recipes', formData)
                .then((res)=>props.history.push('/'))
                .catch((err)=>console.error(res));
            }
        }
    }

    /**
     * Clears recipe from state and returns the user to the home page.
     *
     * @param {*} del = If truthy, sends DELETE request to delete existing recipe.
     */
    function abortRecipe(del){

        if(del){
            axios.delete(`/api/recipes/${formData.id}`, formData)
            .then((res)=>console.log(res))
            .catch((err)=>console.error(res));
        }

        setEditRecipe(null);
        props.history.push('/');
    }

    /**
     * Run on component mount and update.
     */
    useEffect(()=>{
        setEdit(editRecipe);

        // Fill default values of inputs with formData
        document.getElementsByName(`new-recipe__title`)[0].value = formData.title ?? null;
        document.getElementsByName(`new-recipe__description`)[0].value = formData.description ?? null;
    },[editRecipe]);

    // Elements to represent objects in arrays of Recipe object.
    let ingredientEls = [];
    let stepEls = [];

    // Fill ingredientEls with found items.
    for(let ingredient of Object.entries(formData["ingredients"])){
        let idx = formData["ingredients"].indexOf(ingredient[1]);
        ingredient[1].idx = idx;

        ingredientEls.push(
            <li key={idx} onClick={()=>{
                setEditIngredient(ingredient[1]);
                setIngredientModal(true);
            }}>
                {ingredient[1].name} {ingredient[1].quantity || ingredient[1].measurement ? "-" : null} <span>{ingredient[1].quantity} {ingredient[1].measurement}</span>
            </li>
        );
    }

    // Fill stepEls with found items.
    for(let step of Object.entries(formData["steps"])){
        let idx = formData["steps"].indexOf(step[1]);
        step[1].idx = idx;

        stepEls.push(
            <li key={idx} onClick={()=>{
                setStepModal(true);
                setEditStep(step[1]);
            }}>
                Step {idx+1} - <span>{step[1].content}</span>
            </li>
        );
    }
    

    return(
        <div className="cr-wrapper">
            <main className="create-recipe">
                <header className="create-recipe__head">
                    <h1 className="create-recipe__head-title">{edit ? "Update Existing" : "Create New"} Recipe</h1>
                    {edit ? <img src='/assets/icons/x.svg' onClick={()=>abortRecipe()}/> : null }
                </header>
                <form className="create-recipe__form
                ">
                    <label htmlFor="new-recipe__title" className="create-recipe__label">Title</label>
                    <input type="text" name="new-recipe__title" className="input create-recipe__input" onChange={()=>updateForm("title")}></input>

                    <label htmlFor="new-recipe__description" className="create-recipe__label">Description <span className="create-recipe__label--emph">(Optional)</span></label>
                    <input type="text" name="new-recipe__description" className="input create-recipe__input" onChange={()=>updateForm("description")}></input>

                    <p className="create-recipe__label">Ingredients List</p>
                    <ul>{ingredientEls}</ul>
                    <button type="button" className="button-secondary" name="create-recipe__ingredients-btn" onClick={()=>setIngredientModal(true)}>Add Ingredient</button>

                    <p className="create-recipe__label">Steps</p>
                    <ul>{stepEls}</ul>
                    <button type="button" className="button-secondary" name="create-recipe__steps-btn" onClick={()=>setStepModal(true)}>Add Step</button>
                </form>
            </main>
            <section className="create-recipe__footer">
                <p className={`create-recipe__err-message${err ? "--active" : ""}`}>Please fill in the required content before submitting (Recipes must include a Title, Ingredient, and a Step)</p>
                <div>
                    <button type="button" className="button-primary" name="create-recipe__submit" onClick={()=>postRecipe()}>{edit ? "Update" : "Create"} Recipe</button>
                    <button type="button" className="button-secondary" 
                        onClick={()=>{ abortRecipe(edit) }}>
                            <img src="/assets/icons/bin.svg"/>
                    </button>
                </div>
                
            </section>

            <Ingredient updateForm={updateForm} modal={ingredientModal} setModal={setIngredientModal} idx={formData["ingredients"].indexOf(editIngredient)} 
                editIngredient={editIngredient} updateIngredient={updateIngredient} resetEdits={resetEdits}/>

            <Step updateForm={updateForm} modal={stepModal} setModal={setStepModal} steps={formData["steps"].length} editStep={editStep} 
                updateStep={updateStep} resetEdits={resetEdits}/>
        </div>
    );
}