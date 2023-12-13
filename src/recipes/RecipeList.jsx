import React from "react";
import RecipeCard from "./RecipeCard";
import "./RecipeList.css"; // Import your CSS file

function RecipeList({ recipes }) {
    // console.log("RecipeList: ", recipes);
    // for(let recipe of recipes){
    //     console.log(recipe);
    //     console.log("recipe.albel:", recipe.label);
    //     console.log("recipe.image:", recipe.image);
    //     console.log("recipe.id:", recipe.id);
    // }

    return (
        <div className="recipe-list">
            {recipes.map((recipe, index) => (
                <div key={index} className="recipe-card-container">
                    <RecipeCard
                        id={recipe.id}
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