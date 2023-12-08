import React, {useState} from "react";
import RecipeCard from "./RecipeCard";

function RecipeList({recipes}){
    console.log(recipes);

    return (
        <div>
            {recipes.map(recipe => (
                <div>
                    <RecipeCard
                        image={recipe.recipe.image}
                        title={recipe.recipe.label}
                        ingredients={recipe.recipe.ingredientLines}
                        url={recipe.recipe.url}
                    />
                </div>
            ))}
        </div>
    )
}


export default RecipeList;