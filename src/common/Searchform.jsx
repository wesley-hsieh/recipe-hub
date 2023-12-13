import React, {useState} from "react";
import RecipeAPI from "../api/api";
import RecipeList from "../recipes/RecipeList";
import "../common/SearchForm.css";

function Searchform(){
    const [searchTerm, setSearchTerm] = useState("");
    const [recipes, setRecipes] = useState([]);

    async function search(query){
        console.debug("in SearchForm");
        let res = await RecipeAPI.queryRecipes(query);
        console.log(res);

        const recipes = res.recipes.map(recipe => recipe.recipe);

        // setRecipes(res.recipes);
        setRecipes(recipes);
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
            <div className="search-form-container">
                <h3>Search for a recipe!</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        className="search-input"
                        name="searchTerm"
                        placeholder="Enter search term.."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
            <div>
                <RecipeList recipes={recipes}/>
            </div>
        </div>
    )
}

export default Searchform;