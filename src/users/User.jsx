import React, {useContext, useState, useEffect} from "react";
import UserContext from "../auth/UserContext";
import RecipeAPI from "../api/api";
import RecipeList from "../recipes/RecipeList";
import {Link} from "react-router-dom";

function User(){
    const {currentUser} = useContext(UserContext);
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        const res = await RecipeAPI.getRecipes();
        const userRecipes = res.filter((recipe) => recipe.username === currentUser.username);
        // console.log("userRecipes", userRecipes);
        // for(let recipe of userRecipes){
        //     for(let parameter in recipe){
        //         console.log(parameter, recipe[parameter]);
        //     }
        // }

        setRecipes(userRecipes);
    }

    useEffect(() => {
        // Fetch recipes when the component mounts
        fetchRecipes();
    }, []);

    return(
        <div>
            <h2>Welcome, {currentUser.username} !</h2>
            <Link to="/user/edit">Edit your profile</Link>
            <h3>Your Recipes:</h3>
            <ul>
                <RecipeList recipes={recipes}/>
            </ul>
        </div>
    )
}

export default User;

