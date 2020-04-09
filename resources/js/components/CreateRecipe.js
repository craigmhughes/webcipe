const axios = require('axios').default;

import React, {useState} from 'react';

import Ingredient from './Recipe/Ingredient';
import Step from './Recipe/Step';


export default function CreateRecipe(){

    // Default Form state
    const [formData, setFormData] = useState({
        'title': null,
        'description': null,
        'ingredients': [],
        'steps': []
    });

    const [ingredientModal, setIngredientModal] = useState(false);
    const [stepModal, setStepModal] = useState(false);

    /**
     * Update formData state by overwriting the value of the passed key.
     *
     * @param {*} key Targeted key.
     * @param {*} update Add to current value if exists, else overwrite.
     */
    function updateForm(key, update){

        // Get Input Value
        let val = update ?? document.getElementsByName(`new-recipe__${key}`)[0].value;
        
        // Generate new form & overwrite value.
        let newForm = formData;

        if(update){
            newForm[key].push(update);
        } else {
            newForm[key] = val;
        }

        // Update state w/ new form.
        setFormData(newForm);
        console.log(formData);
    }

    function postRecipe(){
        axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.auth_token}`};
        let valid = true;

        // Validate data (check empty inputs)
        for(let key of Object.keys(formData)){
            if(!formData[key]) valid = false;
            else if(formData[key].length < 1) valid = false;
        }

        if(!valid){
            return false;
        } else {
            console.log(true)
            axios.post('/api/recipes', formData)
            .then((res)=>console.log(res))
            .catch((err)=>console.error(res));
        }
    }

    return(
        <div className="cr-wrapper">
            <main className="create-recipe">
                <header className="create-recipe__head">
                    <h1 className="create-recipe__head-title">Create New Recipe</h1>
                </header>
                <form className="create-recipe__form
                ">
                    <label htmlFor="new-recipe__title" className="create-recipe__label">Title</label>
                    <input type="text" name="new-recipe__title" className="input create-recipe__input" onChange={()=>updateForm("title")}></input>

                    <label htmlFor="new-recipe__description" className="create-recipe__label">Description <span className="create-recipe__label--emph">(Optional)</span></label>
                    <input type="text" name="new-recipe__description" className="input create-recipe__input" onChange={()=>updateForm("description")}></input>

                    <p className="create-recipe__label">Ingredients List</p>
                    <button type="button" className="button-secondary" onClick={()=>setIngredientModal(true)}>Add Ingredient</button>

                    <p className="create-recipe__label">Steps</p>
                    <button type="button" className="button-secondary" onClick={()=>setStepModal(true)}>Add Step</button>
                </form>
            </main>
            <section className="create-recipe__footer">
                <button type="button" className="button-primary" onClick={()=>postRecipe()}>Create Recipe</button>
                <button type="button" className="button-secondary"><img src={require("../../assets/icons/bin.svg")}/></button>
            </section>

            <Ingredient updateForm={updateForm} modal={ingredientModal} setModal={setIngredientModal}/>
            <Step updateForm={updateForm} modal={stepModal} setModal={setStepModal} steps={formData["steps"].length}/>
        </div>
    );
}