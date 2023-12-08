import React, {useEffect, useState} from "react";
import RecipeAPI from "../api/api";
import RecipeList from "../recipes/RecipeList";

function Searchform(){
    const [searchTerm, setSearchTerm] = useState("");
    const [recipes, setRecipes] = useState([]);

    async function search(query){
        // console.debug("in SearchForm");
        let res = await RecipeAPI.queryRecipes(query);
        // console.log(res.recipes);

        setRecipes(res.recipes);
    }

    function handleSubmit(evt){
        evt.preventDefault();
        search(searchTerm.trim());
    }

    function handleChange(evt) {
        console.debug("searchTerm handleChange");
        setSearchTerm(evt.target.value);
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        name="searchTerm"
                        placeholder="Enter search term.."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn btn-lg btn-primary">
                        Submit
                    </button>
                </form>
            </div>
            <div>
                <p>recipes here</p>
                {/*{recipes.map(recipe => (*/}
                {/*    //recipe element here*/}
                {/*    <div>*/}
                {/*        <img src={recipe.recipe.image}></img>*/}
                {/*        <p>{recipe.recipe.label}</p>*/}
                {/*        <p> {recipe.recipe.ingredientLines}</p>*/}
                {/*        <p> {recipe.recipe.url}</p>*/}
                {/*        <p> {recipe.recipe.uri}</p>*/}
                {/*    </div>*/}
                {/*))}*/}
                <RecipeList recipes={recipes}/>
            </div>
        </div>
    )
}

export default Searchform;