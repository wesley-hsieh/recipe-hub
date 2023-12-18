import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import RecipeAPI from "../api/api";
import RecipeList from "../recipes/RecipeList";
import { Link } from "react-router-dom";
import "./User.css"; // Import your CSS file for styling

function User() {
    const { currentUser } = useContext(UserContext);
    const [recipes, setRecipes] = useState([]);

    /**defined function to use on component mount to grab
     * user created recipes
      */
    const fetchRecipes = async () => {
        const res = await RecipeAPI.getRecipes();
        const userRecipes = res.filter((recipe) => recipe.username === currentUser.username);
        setRecipes(userRecipes);
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <div className="user-container">
            <h2>Welcome, {currentUser.username}!</h2>
            <div className="links-container">
                <Link className="profile-link" to="/user/edit">Edit your profile</Link>
                <Link className="add-recipe-link" to="/recipe/new">Add a recipe!</Link>
            </div>
            <h3>Your Recipes:</h3>
            <ul>
                <RecipeList recipes={recipes} />
            </ul>
        </div>
    );
}

export default User;
