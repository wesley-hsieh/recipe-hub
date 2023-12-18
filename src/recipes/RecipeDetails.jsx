import React, {useState, useContext, useEffect} from "react";
import {FaHeart} from "react-icons/fa";
import UserContext from "../auth/UserContext";
import noImageFound from "../static/no-image-available.png"
import RecipeAPI from "../api/api";
import {useLocation} from "react-router-dom";
import "./RecipeDetails.css";


function RecipeDetails(){
    const {currentUser} = useContext(UserContext);
    const maxIngredientsToShow = 3; // Set the number of ingredients to show initially
    const [showAllIngredients, setShowAllIngredients] = useState(false);

    const location = useLocation();
    const { id,
        image,
        api_uri,
        label,
        ingredients,
        instructions,
        url } = location.state.recipe || {};

    const toggleIngredients = () => {
        setShowAllIngredients(!showAllIngredients);
    };

    /** Conditional rendering of ingredients list
     * Adds a "Show more" button to recipes that have more than maxIngredientsToShow, which can be adjusted accordingly.
     * "Show less" button collapses the list of ingredients. Default render is collapsed.
     */
    const renderIngredients = () => {
        if (!showAllIngredients && ingredients.length > maxIngredientsToShow) {
            return (
                <>
                    {ingredients.slice(0, maxIngredientsToShow).map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                    <button className="show-more-button" onClick={toggleIngredients}>
                        Show More
                    </button>
                </>
            );
        } else {
            return (
                <>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                    {ingredients.length > maxIngredientsToShow && (
                        <button className="show-more-button" onClick={toggleIngredients}>
                            Show Less
                        </button>
                    )}
                </>
            );
        }
    };

    return (
        <div className="recipe-details-container">
            <div className="recipe-section">
                <div className="top-section">
                    {image ? (
                        <img src={image} alt={label} className="recipe-image" />
                    ) : (
                        <img src={noImageFound} alt="No Image Available" className="recipe-image" />
                    )}
                    <div className="recipe-info">
                        <h2 className="recipe-title">{label}</h2>
                        <ul className="ingredient-list">{renderIngredients()}</ul>
                        {url && (
                            <a href={url} className="recipe-link" target="_blank" rel="noopener noreferrer">
                                View Recipe
                            </a>
                        )}
                    </div>
                </div>
                <div className="instructions-section">
                    {instructions.length > 0 ? (
                        <div>
                            <h3 className="instructions-header">Instructions</h3>
                            <ol className="instructions-list">
                                {instructions.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ol>
                        </div>
                    ) : (
                        <div className="no-instructions">
                            <h3 className="instructions-header">Instructions</h3>
                            <div>No instructions found</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecipeDetails;