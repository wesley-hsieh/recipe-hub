import React, {useState, useEffect} from "react";
import RecipeAPI from "../api/api";
import RecipeList from "../recipes/RecipeList";
import "../common/SearchForm.css";

function SearchForm({search}){
    const [searchTerm, setSearchTerm] = useState("");

    /** Handle form submission */
    function handleSubmit(evt){
        console.log("handlesubmit");
        evt.preventDefault();
        search(searchTerm.trim());
    }

    /** Handle form data changing */
    function handleChange(evt) {
        console.log("handleChange:", evt.target.value);
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
        </div>
    )
}

export default SearchForm;