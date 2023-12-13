import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import "../auth/LoginForm.css";

function LoginForm({login}){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    // console.debug(
    //     "LoginForm",
    //     "login=", typeof login,
    //     "formData=", formData,
    //     "formErrors", formErrors,
    // );

    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
            navigate("/");
        } else {
            setFormErrors(result.errors);
        }
    }

    return (
        <div className="login-form">
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
            {formErrors.length > 0 && (
                <div className="error-message">
                    <Alert type="danger" messages={formErrors} />
                </div>
            )}
        </div>
    );
}



export default LoginForm;