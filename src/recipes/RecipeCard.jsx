import React, { useState, useContext } from "react";
import "./RecipeCard.css"; // Import your CSS file
import {FaHeart} from "react-icons/fa";
import noImageFound from "../static/no-image-available.png"
import RecipeAPI from "../api/api";
import UserContext from "../auth/UserContext";

function RecipeCard({ image, api_uri=null, label, ingredients, url }) {
    const {currentUser} = useContext(UserContext);
    const maxIngredientsToShow = 3; // Set the number of ingredients to show initially
    const [showAllIngredients, setShowAllIngredients] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleIngredients = () => {
        setShowAllIngredients(!showAllIngredients);
    };

    const toggleFavorite = async() => {
        setIsFavorite(!isFavorite);
        console.log("toggleFavorite: ", label);

        //if it isn't a favorite already:
        //add recipe to backend database if not already in there, and then add favorite
        //otherwise, remove favorite
        if(!isFavorite){
            //check if recipe exists in the backend
            const recipe = await RecipeAPI.queryBackend(label);
            console.log(recipe.length);
            //if the recipe isn't in the backend, add it
            if(recipe.length === 0){
                const newRecipe = await RecipeAPI.addRecipe({
                    image,
                    api_uri: api_uri ? api_uri : null,
                    label: label,
                    ingredients: ingredients.join(','),
                    url,
                    username: currentUser.username
                });
                console.log(newRecipe);
                await RecipeAPI.addFavorite(currentUser.username, newRecipe.recipe.id);
            }else{ //just add the favorite
                await RecipeAPI.addFavorite(currentUser.username, recipe.recipe.id);
            }
        }else{ //remove the favorite from the database;
            const recipe = await RecipeAPI.queryBackend(label);
            await RecipeAPI.removeFavorite(currentUser.username, recipe.recipe.id);
        }


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
                <img src={image} alt={label} className="recipe-image" />
            ) : (
                <img src={noImageFound} alt="No Image Available" className="recipe-image" />
            )}
            <div className="recipe-details">
                <button className="favorite-button" onClick={toggleFavorite}>
                    <FaHeart color={isFavorite ? "red" : "grey"} /> {/* Heart icon */}
                </button>
                <h2 className="recipe-title">{label}</h2>
                <ul className="ingredient-list">{renderIngredients()}</ul>
                <a href={url} className="recipe-link" target="_blank" rel="noopener noreferrer">
                    View Recipe
                </a>
            </div>
        </div>
    );
}

export default RecipeCard;
