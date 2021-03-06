import React, {useState, useEffect} from 'react';

export default function Step({updateForm, modal, setModal, steps, editStep, updateStep, resetEdits}){

    // Boolean value of if an Step is to be edited.
    const [edit, setEdit] = useState(editStep !== null);

    // Toggle error message
    const [err,setErr] = useState(false);

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

    /**
     * Create new step.
     *
     * @returns false if form is invalid.
     */
    function createStep(){
        let keys = edit ? ["content","order"]:["content"];
        let newStep = {};
        let valid = true;

        keys.forEach(key => {
            let val = document.getElementsByName(`new-step__${key}`)[0].value;
            if(val.length < 1) valid = false;
            newStep[key] = val;
        });

        if(!valid) {
            setErr(true);
            setTimeout(()=>setErr(false), 6000);
            return false;
        }

        if(edit){
            updateStep(newStep);
        } else {
            newStep["order"] = steps;
            updateForm('steps', newStep);
        }

        abortStep();
        setEdit(false);
    }

    // Run on component mount and on update of editStep and steps.
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
                    {edit ? <button type="button" className="button-primary" onClick={()=>abortStep()}>Cancel</button> : null}
                </form>
            </main>
            <section className="create-recipe__footer">
                <p className={`create-recipe__err-message${err ? "--active" : ""}`}>Please fill in the required content before submitting (Step must include content)</p>

                <div>
                    <button type="button" className="button-primary" name="new-step__submit" onClick={()=>createStep()}>{edit ? "Update" : "Add"} Step</button>
                    <button type="button" className="button-secondary" onClick={()=>abortStep(edit)}><img src="/assets/icons/bin.svg"/></button>
                </div>
            </section>
        </div>
    );
}