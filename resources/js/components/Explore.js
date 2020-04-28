const axios = require('axios').default;
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function Explore({  props, setShowRecipe, user }){

    // Contains recipes from all users if connected.
    const [recipes, setRecipes] = useState(null);

    const [url, setUrl] = useState(0);

    // Request recipes from server.
    function getRecipes(){
        axios.get(`/api/recipes${url === 1 ? "?order=quickest" : ""}`)
            .then((res)=> {if(res.data.recipes){
                setRecipes(res.data.recipes);
            }})
            .catch((err)=>console.error(res));
    }

    // Run on component mount
    useEffect(() => {
        getRecipes();
    }, [url]);

    // Create and fill list elements with the recipes found.
    let recipeEls = [];
    if(recipes !== null){
        for(let recipe of recipes){
            recipeEls.push(
            <li key={recipe.id} onClick={()=>setShowRecipe(recipe, props)} className="explore__recipe">
                <div style={{backgroundImage:`url('${recipe.image ? '/storage/recipe_images/' + recipe.image : '/assets/images/null.svg'}')`}} className="explore__recipe-image"></div>
                <div className="explore__recipe-info">
                    <p className="explore__recipe-title">{recipe.title}</p>
                    <p className="explore__recipe-author">By {recipe.author_id}</p>
                </div>
            </li>);
        }
    }    

    return (
        <article className="explore">
            {// Only render if not logged in.
            user !== null ? null :
            <header className="explore__header">
                <img src="/assets/images/together.svg" className="explore__header-art"></img>
                <section className="explore__header-info">
                    <p className="explore__header-title">Share your recipes!</p>
                    <p>Create an account and have the option to create your own recipes so you can keep them in mind.</p>
                    <Link to="/register" className="explore__header-link">Get Started <img src="/assets/icons/arrow-right.svg" /></Link>
                </section>
            </header>}
            <main className={`explore__main${user ? "--alone" : ""}`}>
                <div className="explore__main-info">
                    <h1 className="explore__main-title">Recipes</h1>
                    <div className="explore__main-orderby">
                        <p>Order by: </p>
                        <button onClick={()=>setUrl(0)} className={`button-${url === 0 ? "primary" : "secondary"}`}>Newest</button>
                        <button onClick={()=>setUrl(1)} className={`button-${url === 1 ? "primary" : "secondary"}`}>Quickest</button>
                    </div>
                </div>

                <ul className="explore__recipe-list">
                    {recipeEls}
                </ul>
            </main>
        </article>
    );
}