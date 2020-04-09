const axios = require('axios').default;

import React from 'react';


export default function CreateRecipe(){

    // axios.get('/api/recipes').then((res)=>console.log(res));
    axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.auth_token}`};
    axios.post('/api/recipes', {
        'title': "Test",
        'description': null,
        'ingredients': [
            {
                'name': "milk",
                'quantity': 100,
                'measurement': "ml"
            },
            {
                'name': "bread",
                'quantity': 1,
                'measurement': "loaf"
            }
        ],
        'steps': [
            {
                'order': 0,
                'content': "testing step one"
            },
            {
                'order': 1,
                'content': "testing step two"
            }
        ]
    })
    .then((res)=>{
        console.log(res);
    });

    return(
        <div className="cr-wrapper">
            <main className="create-recipe">
                <header className="create-recipe__head">
                    <h1 className="create-recipe__head-title">Create New Recipe</h1>
                </header>
                <form className="create-recipe__form
                ">
                    <label htmlFor="new-recipe__title" className="create-recipe__label">Title</label>
                    <input type="text" name="new-recipe__title" className="input create-recipe__input"></input>

                    <label htmlFor="new-recipe__desc" className="create-recipe__label">Description <span className="create-recipe__label--emph">(Optional)</span></label>
                    <input type="text" name="new-recipe__desc" className="input create-recipe__input"></input>

                    <p className="create-recipe__label">Ingredients List</p>
                    <button type="button" className="button-secondary">Add Ingredient</button>

                    <p className="create-recipe__label">Steps</p>
                    <button type="button" className="button-secondary">Add Step</button>
                </form>
            </main>
            <section className="create-recipe__footer">
                <button type="button" className="button-primary">Create Recipe</button>
                <button type="button" className="button-secondary"><img src={require("../../assets/icons/bin.svg")}/></button>
            </section>
        </div>
    );
}