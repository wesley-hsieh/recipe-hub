import React from "react";
import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

/** RecipeList component
 *
 * accepts list of recipe objects on which multiple RecipeCard components will be rendered from
 *
 * @param recipes
 * @returns {JSX.Element}
 * @constructor
 */

function RecipeList({ recipes }) {

    const getInstructions = (recipe) => {
        if (recipe.instructionLines) {
            return recipe.instructionLines;
        } else if (recipe.instructions) {
            return recipe.instructions.split(",");
        }
        return null;
    };

    const recipeCards = recipes.map((recipe, index) => {
        const instructions = getInstructions(recipe);

        return (
            <div key={index} className="recipe-card-container">
                <RecipeCard
                    id={recipe.id}
                    image={recipe.image ? recipe.image : null}
                    label={recipe.label}
                    api_uri={recipe.uri}
                    ingredients={
                        recipe.ingredientLines
                            ? recipe.ingredientLines
                            : recipe.ingredients.split(",")
                    }
                    instructions={instructions}
                    url={recipe.url ? recipe.url : null}
                />
            </div>
        );
    });

    return <div className="recipe-list">{recipeCards}</div>;
}

export default RecipeList;