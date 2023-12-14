import React, {useState, useEffect} from "react";
import RecipeAPI from "../api/api";
import RecipeList from "../recipes/RecipeList";
import "../common/SearchForm.css";

function Searchform(){
    const [searchTerm, setSearchTerm] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [cont, setCont] = useState([null]);
    const [page, setPage] = useState(null);
    const [query, setQuery] = useState(null);

    async function search(query){
        console.debug("in SearchForm", query);
        let res = await RecipeAPI.queryRecipes({name: query});
        console.log(res);

        const recipes = res.recipes.map(recipe => recipe.recipe);

        // setRecipes(res.recipes);
        setRecipes(recipes);

        setPage(0);
        setCont([null, res._cont]);
        setQuery(query);
    }

    function handleSubmit(evt){
        evt.preventDefault();
        search(searchTerm.trim());
    }

    function handleChange(evt) {
        console.debug("searchTerm handleChange");
        setSearchTerm(evt.target.value);
    }

    function handlePageChange(direction){
        if (direction === "next") {
            setPage((page) => page + 1);
        } else if (direction === "prev" && page > 0) {
            setPage((page) => page - 1);
        }
    }

    useEffect(() => {
        console.debug("Current page: ", page);
        async function grabPage(){
            // console.debug(page);
            console.debug(cont);
            const contValue = cont[page];
            console.debug("contVlaue: ", contValue);

            let res = await RecipeAPI.queryRecipes({name: query, data: {contValue: contValue}});
            console.debug("grabPage: ", res);

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

export default Searchform;