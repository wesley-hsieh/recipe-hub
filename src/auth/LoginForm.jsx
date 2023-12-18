import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import "../auth/LoginForm.css";

/** Loginform component
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to homepage
 */

function LoginForm({login}){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    /** Handle form data changing */
    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value }));
    }

    /** Handle form submission */
    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
            navigate("/");
        } else {
            setErrorMessage("Incorrect username or password.");
            setFormErrors(result.errors);
        }
    }

    return (
        <div className="login-form">
            {errorMessage && (
                <div className="error-message">
                    <Alert type="danger" messages={[errorMessage]} />
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}



export default LoginForm;