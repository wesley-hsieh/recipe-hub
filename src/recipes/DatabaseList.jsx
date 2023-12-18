import React, {useEffect, useState} from "react";
import RecipeCard from "./RecipeCard";
import "./DatabaseList.css";
import RecipeAPI from "../api/api";

/** DatabaseList component
 *
 * accepts list of recipe objects on which multiple RecipeCard components will be rendered from
 *
 * @param recipes
 * @returns {JSX.Element}
 * @constructor
 */

function DatabaseList() {
    console.log("DatabaseList", );/**/
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchRecipes(){
            try{
                const allRecipes = await RecipeAPI.getRecipes();
                console.log("all recipes: ", allRecipes);
                allRecipes.forEach(recipe => console.log(recipe.instructions));


                setRecipes(allRecipes);
            }catch(err){
                console.error(err);
            }
        }
        fetchRecipes();
    }, []);

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

export default DatabaseList;