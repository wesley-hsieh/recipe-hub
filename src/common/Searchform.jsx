import React, {useEffect, useState} from "react";
import RecipeAPI from "../api/api";

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
                {recipes.map(recipe => (
                    //recipe element here
                    <p>{recipe.recipe.label}</p>
                ))}
            </div>
        </div>
    )
}

export default Searchform;