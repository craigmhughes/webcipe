import React, {useState, useEffect} from 'react';

export default function Ingredient({updateForm, modal, setModal, idx, editIngredient, updateIngredient, resetEdits}){

    // Boolean value of if an Ingredient is to be edited.
    const [edit, setEdit] = useState(editIngredient !== null);

    // Toggle error message
    const [err,setErr] = useState(false);

    /**
     * Clear changes to ingredients.
     * If del exists then delete changes, rather than forgetting them.
     *
     * @param {*} del If exists, delete item.
     */
    function abortIngredient(del){
        let keys = ["name","quantity","measurement"];

        keys.forEach(key => {
            document.getElementsByName(`new-ingredient__${key}`)[0].value = null;
        });

        if(del){
            updateForm("ingredients", editIngredient, true);
        }

        setModal(false);
        resetEdits();
    }

    /**
     * Create new ingredient.
     *
     * @returns false if form is invalid.
     */
    function createIngredient(){
        let keys = ["name","quantity",["measurement", "nullable"]];
        let newIngredient = {};
        let valid = true;

        keys.forEach(key => {
            // Nullable field will not need checking.
            if(typeof key === 'object'){
                newIngredient[key[0]] = document.getElementsByName(`new-ingredient__${key[0]}`)[0].value.length > 0 ? 
                    document.getElementsByName(`new-ingredient__${key[0]}`)[0].value : null;
            } else {
                let val = document.getElementsByName(`new-ingredient__${key}`)[0].value;
                if(val.length < 1) valid = false;
                newIngredient[key] = val;
            }
        });

        if(!valid) {
            setErr(true);
            setTimeout(()=>setErr(false), 6000);
            return false;
        }
        newIngredient['idx'] = idx;

        if(edit){
            updateIngredient(newIngredient);
        } else {
            updateForm('ingredients', newIngredient);
        }

        
        abortIngredient();
    }

    // Run on component mount and on update of editIngredient.
    useEffect(() => {
        setEdit(editIngredient !== null);

        if(editIngredient){
            let keys = ["name","quantity","measurement"];

            keys.forEach(key => {
                document.getElementsByName(`new-ingredient__${key}`)[0].value = editIngredient[key]
            });
        }
    }, [editIngredient]);

    return(
        <div className={`cr-wrapper popout${!modal ? "--hidden" : ""}`}>
            <main className="create-recipe">
                <header className="create-recipe__head">
                    <h1 className="create-recipe__head-title">{edit ? "Edit" : "Add"} Ingredient</h1>
                </header>
                <form className="create-recipe__form
                ">
                    <label htmlFor="new-ingredient__name" className="create-recipe__label">Name</label>
                    <input type="text" name="new-ingredient__name" className="input create-recipe__input"></input>

                    <label htmlFor="new-ingredient__quantity" className="create-recipe__label">Quantity</label>
                    <input type="number" step="0.01" name="new-ingredient__quantity" className="input create-recipe__input"></input>

                    <label htmlFor="new-ingredient__measurement" className="create-recipe__label">Measurement  <span className="create-recipe__label--emph">(Optional)</span></label>
                    <input type="text" name="new-ingredient__measurement" className="input create-recipe__input"></input>
                    {edit ? <button type="button" className="button-primary" onClick={()=>abortIngredient()}>Cancel</button> : null}
                </form>
            </main>
            <section className="create-recipe__footer">
                <p className={`create-recipe__err-message${err ? "--active" : ""}`}>Please fill in the required content before submitting (Ingredients must include a Name and Quantity)</p>
                <div>
                    <button type="button" className="button-primary" name="new-ingredient__submit" onClick={()=>createIngredient()}>{edit ? "Edit" : "Add"} Ingredient</button>
                    <button type="button" className="button-secondary" onClick={()=>{
                        abortIngredient(edit);
                    }}><img src="/assets/icons/bin.svg"/></button>
                </div>
            </section>
        </div>
    );
}