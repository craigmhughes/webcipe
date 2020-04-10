import React, {useState, useEffect} from 'react';

export default function Step({updateForm, modal, setModal, steps, editStep, updateStep, resetEdits}){

    const [edit, setEdit] = useState(editStep !== null);

    /**
     * Exit modal.
     *
     * @param {Boolean} del should the edit object be deleted or just forgotten.
     */
    function abortStep(del){
        let keys = ["content"];

        keys.forEach(key => {
            document.getElementsByName(`new-step__${key}`)[0].value = null;
        });

        if(del){
            updateForm("steps", editStep, true);
        }

        setModal(false);
        resetEdits();
    }

    function createStep(){
        let keys = edit ? ["content","order"]:["content"];
        let newStep = {};
        let valid = true;

        keys.forEach(key => {
            let val = document.getElementsByName(`new-step__${key}`)[0].value;
            if(val.length < 1) valid = false;
            newStep[key] = val;
        });

        if(!valid) return false;

        if(edit){
            updateStep(newStep);
        } else {
            newStep["order"] = steps;
            updateForm('steps', newStep);
        }

        abortStep();
        setEdit(false);
    }

    useEffect(() => {
        setEdit(editStep !== null);

        if(editStep){
            let keys = ["content","order"];

            keys.forEach(key => {
                document.getElementsByName(`new-step__${key}`)[0].value = editStep[key]
            });
        }
    }, [editStep, steps]);

    return(
        <div className={`cr-wrapper popout${!modal ? "--hidden" : ""}`}>
            <main className="create-recipe">
                <header className="create-recipe__head">
                    <h1 className="create-recipe__head-title">{edit ? "Edit" : "Add"} Step</h1>
                </header>
                <form className="create-recipe__form
                ">
                    <label htmlFor="new-step__content" className="create-recipe__label">Content</label>
                    <input type="text" name="new-step__content" className="input create-recipe__input"></input>
                    <input type="hidden" name="new-step__order"></input>
                    <button type="button" className="button-primary" onClick={()=>abortStep()}>Cancel</button>
                </form>
            </main>
            <section className="create-recipe__footer">
                <button type="button" className="button-primary" onClick={()=>createStep()}>{edit ? "Update" : "Add"} Step</button>
                <button type="button" className="button-secondary" onClick={()=>abortStep(true)}><img src={require("../../../assets/icons/bin.svg")}/></button>
            </section>
        </div>
    );
}