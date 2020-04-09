import React from 'react';

export default function Ingredient({updateForm, modal, setModal}){



    function abortIngredient(){
        let keys = ["name","quantity","measurement"];

        keys.forEach(key => {
            document.getElementsByName(`new-ingredient__${key}`)[0].value = null;
        });

        setModal(false);
    }

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

        if(!valid) return false;

        updateForm('ingredients', newIngredient);
        abortIngredient();
    }

    return(
        <div className={`cr-wrapper popout${!modal ? "--hidden" : ""}`}>
            <main className="create-recipe">
                <header className="create-recipe__head">
                    <h1 className="create-recipe__head-title">Add Ingredient</h1>
                </header>
                <form className="create-recipe__form
                ">
                    <label htmlFor="new-ingredient__name" className="create-recipe__label">Name</label>
                    <input type="text" name="new-ingredient__name" className="input create-recipe__input"></input>

                    <label htmlFor="new-ingredient__quantity" className="create-recipe__label">Quantity</label>
                    <input type="number" step="0.01" name="new-ingredient__quantity" className="input create-recipe__input"></input>

                    <label htmlFor="new-ingredient__measurement" className="create-recipe__label">Measurement</label>
                    <input type="text" name="new-ingredient__measurement" className="input create-recipe__input"></input>
                </form>
            </main>
            <section className="create-recipe__footer">
                <button type="button" className="button-primary" onClick={()=>createIngredient()}>Create Ingredient</button>
                <button type="button" className="button-secondary" onClick={()=>abortIngredient()}><img src={require("../../../assets/icons/bin.svg")}/></button>
            </section>
        </div>
    );
}