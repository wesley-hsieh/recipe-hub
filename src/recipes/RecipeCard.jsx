import React, {useState, useContext, useEffect} from "react";
import "./RecipeCard.css";
import {FaHeart} from "react-icons/fa";
import noImageFound from "../static/no-image-available.png"
import RecipeAPI from "../api/api";
import UserContext from "../auth/UserContext";
import {useNavigate} from "react-router-dom";

/** RecipeCard component
 *
 * Represents a singular recipe instance
 *
 * @param id
 * @param image can be null
 * @param api_uri can be null
 * @param label
 * @param ingredients
 * @param url
 * @returns {JSX.Element}
 * @constructor
 */

function RecipeCard({id, image, api_uri=null, label, ingredients, instructions, url }) {
    const {currentUser} = useContext(UserContext);
    const maxIngredientsToShow = 3; // Set the number of ingredients to show initially
    const [showAllIngredients, setShowAllIngredients] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const navigate = useNavigate();

    /** On component mount, grab specifically all the user's favorite recipes in order to determine initial state
     */
    useEffect(()=> {
        async function getFavorites(){
            try{
                const {favorites} = await RecipeAPI.queryFavorites(currentUser.username);
                favorites.forEach((favorite) => {
                    if(favorite.recipe_id === id){
                        setIsFavorite(true);
                    }
                })
            }catch(err){
                console.error(err);
            }
        }
        if(currentUser){
            getFavorites();
        }
    },[]);

    const toggleIngredients = () => {
        setShowAllIngredients(!showAllIngredients);
    };

    const toggleFavorite = async() => {
        setIsFavorite(!isFavorite);

        //if it isn't a favorite already:
        //add recipe to backend database if not already in there, and then add favorite
        //otherwise, remove favorite
        if(!isFavorite){
            //check if recipe exists in the backend
            const recipe = await RecipeAPI.queryBackend(label);
            //if the recipe isn't in the backend, add it
            if(recipe.length === 0){
                const newRecipe = await RecipeAPI.addRecipe({
                    image,
                    api_uri: api_uri ? api_uri : null,
                    label: label,
                    ingredients: ingredients.join(','),
                    instructions: instructions.join(','),
                    url,
                    username: currentUser.username
                });
                await RecipeAPI.addFavorite(currentUser.username, newRecipe.recipe.id);
            }else{ //just add the favorite
                await RecipeAPI.addFavorite(currentUser.username, recipe[0].id);
            }
        }else{ //remove the favorite from the database;
            const recipe = await RecipeAPI.queryBackend(label);
            await RecipeAPI.removeFavorite(currentUser.username, recipe[0].id);
        }
    }

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

    const handleClick = () => {
        navigate(`/recipe/${label}`, { state: { recipe:  {id, image, api_uri: api_uri? api_uri: null, label, ingredients, instructions, url } } });
    };

    return (
        <div className="recipe-card">
            {image ? (
                <img src={image} alt={label} className="recipe-image" />
            ) : (
                <img src={noImageFound} alt="No Image Available" className="recipe-image" />
            )}
            <div className="recipe-details">
                {currentUser ?
                    <button className="favorite-button" onClick={toggleFavorite}>
                        <FaHeart color={isFavorite ? "red" : "grey"} /> {/* Heart icon */}
                    </button> :
                    null
                }
                <h2 className="recipe-title">{label}</h2>
                {/*<h2 className="recipe-title">{label} </h2>*/}
                <ul className="ingredient-list">{renderIngredients()}</ul>
                <div className="button-div">
                    {url ? (
                        <a href={url} className="view-recipe-button" target="_blank" rel="noopener noreferrer">
                            External Link
                        </a>) : null
                    }
                    <button className="view-recipe-button" onClick={handleClick}>
                        View Recipe
                    </button>
                </div>


            </div>
        </div>
    );
}

export default RecipeCard;
