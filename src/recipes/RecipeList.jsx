import React from "react";
import RecipeCard from "./RecipeCard";
import "./RecipeList.css"; // Import your CSS file

function RecipeList({ recipes }) {
    console.log(recipes);

    return (
        <div className="recipe-list">
            {recipes.map((recipe, index) => (
                <div key={index} className="recipe-card-container">
                    <RecipeCard
                        image={recipe.recipe.image}
                        title={recipe.recipe.label}
                        ingredients={recipe.recipe.ingredientLines}
                        url={recipe.recipe.url}
                    />
                </div>
            ))}
        </div>
    );
}

export default RecipeList;
