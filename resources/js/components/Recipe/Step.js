import React from 'react';

export default function Step({updateForm, modal, setModal, steps}){



    function abortStep(){
        let keys = ["content"];

        keys.forEach(key => {
            document.getElementsByName(`new-step__${key}`)[0].value = null;
        });

        setModal(false);
    }

    function createStep(){
        let keys = ["content"];
        let newStep = {};
        let valid = true;

        keys.forEach(key => {
            let val = document.getElementsByName(`new-step__${key}`)[0].value;
            if(val.length < 1) valid = false;
            newStep[key] = val;
        });

        if(!valid) return false;

        newStep["order"] = steps;

        updateForm('steps', newStep);
        abortStep();
    }

    return(
        <div className={`cr-wrapper popout${!modal ? "--hidden" : ""}`}>
            <main className="create-recipe">
                <header className="create-recipe__head">
                    <h1 className="create-recipe__head-title">Add Step</h1>
                </header>
                <form className="create-recipe__form
                ">
                    <label htmlFor="new-step__content" className="create-recipe__label">Content</label>
                    <input type="text" name="new-step__content" className="input create-recipe__input"></input>
                </form>
            </main>
            <section className="create-recipe__footer">
                <button type="button" className="button-primary" onClick={()=>createStep()}>Create Step</button>
                <button type="button" className="button-secondary" onClick={()=>abortStep()}><img src={require("../../../assets/icons/bin.svg")}/></button>
            </section>
        </div>
    );
}