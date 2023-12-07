import React, {useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import UserContext from "../auth/UserContext";
import "../nav/NavBar.css";

function NavBar({logout}){
    const {currentUser} = useContext(UserContext);
    console.debug("NavBar", "currentUser: ", currentUser);

    function userNav(){
        return (
            <ul>
                <li>
                    <NavLink to="/recipes">Recipes</NavLink>
                </li>
                <li>
                    <NavLink to="/profile"></NavLink>
                </li>
                <li>
                    <Link to="/" onClick={logout}>Logout</Link>
                </li>
            </ul>
        )
    }

    function noUserNav(){
        return(
            <ul>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/signup">Signup</NavLink>
                </li>
            </ul>
        )
    }

    return(
        <nav>
            <Link to="/">Recipe Hub</Link>
            {currentUser ? userNav() : noUserNav()}
        </nav>
    )
}

export default NavBar;