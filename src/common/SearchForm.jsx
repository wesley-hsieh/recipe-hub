import React, {useState, useEffect} from "react";
import RecipeAPI from "../api/api";
import RecipeList from "../recipes/RecipeList";
import "../common/SearchForm.css";

function SearchForm(){
    const [searchTerm, setSearchTerm] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [cont, setCont] = useState([null]);
    const [page, setPage] = useState(null);
    const [query, setQuery] = useState(null);

    /** search function to query based on user's submission*/
    async function search(query){
        let res = await RecipeAPI.queryRecipes({name: query});
        const recipes = res.recipes.map(recipe => recipe.recipe);

        setRecipes(recipes);

        setPage(0);
        setCont([null, res._cont]);
        setQuery(query);
    }

    /** Handle form submission */
    function handleSubmit(evt){
        evt.preventDefault();
        search(searchTerm.trim());
    }

    /** Handle form data changing */
    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    /** Handle page change, can be multi-purposed for "forwards" or "backwards"*/
    function handlePageChange(direction){
        if (direction === "next") {
            setPage((page) => page + 1);
        } else if (direction === "prev" && page > 0) {
            setPage((page) => page - 1);
        }
    }

    /** useEffect on the page state variable to grab next set of recipes
     * based off the _cont value that is given to us in the initial query and subsequent queries
     * */
    useEffect(() => {
        async function grabPage(){
            const contValue = cont[page];
            let res = await RecipeAPI.queryRecipes({name: query, data: {contValue: contValue}});
            const recipes = res.recipes.map(recipe => recipe.recipe);
            setRecipes(recipes);
            setCont([...cont, res._cont]);
        }
        if(page > 0){
            grabPage();
        }
        else if (page === 0){
            search(query);
        }
    }, [page]);

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
                {recipes && recipes.length > 0 && ( // Conditionally render the button
                    <div style={{margin: 10}}>
                        {page > 0 && (<button className="submit-button" onClick={() => handlePageChange("prev")}>Prev Page </button>)}
                        <button className="submit-button" onClick={() => handlePageChange("next")}>Next Page</button>
                    </div>
                )}
                <RecipeList recipes={recipes}/>
            </div>
        </div>
    )
}

export default SearchForm;