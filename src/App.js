import logo from './logo.svg';
import './App.css';

import RecipeAPI from "./api/api";
import React, {useState, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import UserContext from "./auth/UserContext";
import {jwtDecode} from "jwt-decode";
import NavBar from "./nav/NavBar";
import NavRoutes from "./nav/NavRoutes";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);
    const [infoLoaded, setInfoLoaded] = useState(false);

    console.debug(
        "Recipe Hub",
        "infoLoaded=", infoLoaded,
        "currentUser=", currentUser,
        "token=", token,
    );

    /** loadUserInfo()
     * useEffect on the value of the token so this only runs
     * when a user logs in or logs out.
     * */

    useEffect(function loadUserInfo() {
        console.debug("App useEffect loadUserInfo", "token=", token);

        async function getCurrentUser() {
            if (token) {
                try {
                    let { username } = jwtDecode(token);
                    // put the token on the Api class so it can use it to call the API.
                    RecipeAPI.token = token;
                    let currentUser = await RecipeAPI.getCurrentUser(username);
                    setCurrentUser(currentUser);
                } catch (err) {
                    console.error("App loadUserInfo: problem loading", err);
                    setCurrentUser(null);
                }
            }
            setInfoLoaded(true);
        }

        setInfoLoaded(false);
        getCurrentUser();
    }, [token]);

    /** Signup function
     * automatically logs user in (setToken)
     * */
    async function signup(signupData) {
        try {
            let token = await RecipeAPI.signup(signupData);
            setToken(token);
            return { success: true };
        } catch (errors) {
            console.error("signup failed", errors);
            return { success: false, errors };
        }
    }

    /** Login function*/
    async function login(loginData) {
        try {
            let token = await RecipeAPI.login(loginData);
            setToken(token);
            return { success: true };
        } catch (errors) {
            console.error("login failed", errors);
            return { success: false, errors };
        }
    }

    /** Logout function */
    function logOut(){
        setCurrentUser(null);
        setToken(null);
    }

    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{currentUser, setCurrentUser}}>
                    <div className="recipeHub">
                        <NavBar logout={logOut}/>
                        <NavRoutes login={login} signup={signup}/>
                    </div>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
