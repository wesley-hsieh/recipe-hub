import React from "react";
import RecipeCard from "./RecipeCard";
import "./RecipeList.css"; // Import your CSS file

function RecipeList({ recipes }) {
    // console.log(recipes);
    // for(let recipe of recipes){
    //     console.log(recipe);
    //     console.log(recipe.title);
    //     console.log(recipe.image);
    // }

    return (
        <div className="recipe-list">
            {recipes.map((recipe, index) => (
                <div key={index} className="recipe-card-container">
                    <RecipeCard
                        image={recipe.image ? recipe.image : null}
                        label={recipe.label}
                        ingredients={recipe.ingredientLines ? recipe.ingredientLines : recipe.ingredients.split(",")}
                        url={recipe.url ? recipe.url : null}
                    />
                </div>
            ))}
        </div>
    );
}

export default RecipeList;