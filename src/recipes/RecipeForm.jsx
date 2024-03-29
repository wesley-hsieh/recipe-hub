import React, {useContext, useState} from "react";
import RecipeAPI from "../api/api";
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";
import "../recipes/RecipeForm.css";
import {Link} from "react-router-dom";

/** RecipeForm component for adding a recipe to the database*/
function RecipeForm(){
    const {currentUser} = useContext(UserContext);
    const [formData, setFormData] = useState({
        label: "",
        url: "",
        ingredients: "",
        instructions: "",
        image: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    /** Handle form data changing */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
        setFormErrors([]);
    }

    /** Handle form submission */
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            let data = {...formData, username: currentUser.username};
            const newRecipe = await RecipeAPI.addRecipe({...formData, username: currentUser.username});
            setSuccessMessage("Recipe added successfully!");
        } catch (error) {
            setFormErrors(["An error occurred. Please try again."]);
        }
    }

    return (
        <div className="new-recipe-form">
            <h3>Add your own recipe and share it with the world!</h3>
            {successMessage && (
                <Link to="/profile">
                    <Alert type="success" messages={[successMessage]} />
                </Link>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="label">Recipe Label:</label>
                    <input
                        type="text"
                        id="label"
                        name="label"
                        placeholder="What is your fantastic creation called?"
                        value={formData.label}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="url">URL:</label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        placeholder="Is this a recipe from a website? Insert URL here"
                        value={formData.url}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        placeholder="Please input a comma-separated list of ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="instructions">Instructions:</label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        placeholder="Please input a comma-separated list of instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        placeholder="Give a URL to your image!"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>

                {formErrors.length > 0 && <Alert type="danger" messages={formErrors} />}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}




export default RecipeForm;