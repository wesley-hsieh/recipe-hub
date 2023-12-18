import React, {useContext, useEffect, useState} from "react";
import UserContext from "../auth/UserContext";
import SearchForm from "../common/SearchForm";
import RecipeList from "../recipes/RecipeList";
import RecipeAPI from "../api/api";
import Alert from "../common/Alert";
import "./Homepage.css"

function Homepage(){
    const {currentUser} = useContext(UserContext);
    const [recipes, setRecipes] = useState([]);
    const [cont, setCont] = useState([null]);
    const [page, setPage] = useState(null);
    const [query, setQuery] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");


    console.debug("Homepage", "currentUser=", currentUser);

    /** search function to query based on user's submission*/
    async function search(query){
        let res = await RecipeAPI.queryRecipes({name: query});

        try{
            const recipes = res.recipes.map(recipe => recipe.recipe);

            setRecipes(recipes);

            setPage(0);
            setCont([null, res._cont]);
            setQuery(query);
            setErrorMessage("");
        }catch(err){
            setErrorMessage("No found recipes or unidentifiable query!");
        }

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
        <div className="home-page">
            {errorMessage && (
                <div className="error-message">
                    <Alert type="danger" messages={[errorMessage]} />
                </div>
            )}
            <SearchForm search={search}/>
            <div>
                {recipes && recipes.length > 0 && ( // Conditionally render the button
                    <div style={{margin: 10}}>
                        {page > 0 && (<button className="submit-button" onClick={() => handlePageChange("prev")}>Prev Page </button>)}
                        <button className="submit-button" onClick={() => handlePageChange("next")}>Next Page</button>
                    </div>
                )}
            </div>
            <RecipeList recipes={recipes}/>
        </div>
    )
}




export default Homepage;