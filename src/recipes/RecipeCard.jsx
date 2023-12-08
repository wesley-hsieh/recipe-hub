import React, { useState } from "react";
import "./RecipeCard.css"; // Import your CSS file
import {FaHeart} from "react-icons/fa";
import noImageFound from "../static/no-image-available.png"

function RecipeCard({ image, title, ingredients, url }) {
    const maxIngredientsToShow = 3; // Set the number of ingredients to show initially
    const [showAllIngredients, setShowAllIngredients] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleIngredients = () => {
        setShowAllIngredients(!showAllIngredients);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    }

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
        <div className="recipe-card">
            {image ? (
                <img src={image} alt={title} className="recipe-image" />
            ) : (
                <img src={noImageFound} alt="No Image Available" className="recipe-image" />
            )}
            <div className="recipe-details">
                <button className="favorite-button" onClick={toggleFavorite}>
                    <FaHeart color={isFavorite ? "red" : "grey"} /> {/* Heart icon */}
                </button>
                <h2 className="recipe-title">{title}</h2>
                <ul className="ingredient-list">{renderIngredients()}</ul>
                <a href={url} className="recipe-link" target="_blank" rel="noopener noreferrer">
                    View Recipe
                </a>
            </div>
        </div>
    );
}

export default RecipeCard;
