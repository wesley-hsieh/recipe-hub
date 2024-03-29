import React, {useContext, useEffect, useState} from "react";
import UserContext from "../auth/UserContext";
import {Routes, Navigate, Route} from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import User from "../users/User";
import UserEditForm from "../users/UserEditForm";
import RecipeForm from "../recipes/RecipeForm";
import RecipeDetails from "../recipes/RecipeDetails";
import DatabaseList from "../recipes/DatabaseList";

/** NavRoutes component
 * Represents the <Routes/> component for react-router-dom package.
 * */
function NavRoutes({login, signup}){
    const { currentUser, recipes, setRecipes } = useContext(UserContext);
    // console.debug("NavRoutes", `login=${typeof login}`, `signup=${typeof signup}`);

    return (
        <Routes>
            <Route exact path="/" element={<Homepage/>}>
            </Route>

            <Route exact path="/login" element={<LoginForm login={login}/>}>
            </Route>

            <Route exact path="/signup" element={<SignupForm signup={signup}/> }>
            </Route>

            <Route exact path="/recipes" element={<DatabaseList/>}>
            </Route>

            <Route exact path="/profile" element={<User/>}></Route>

            <Route exact path="/user/edit" element={<UserEditForm/>}></Route>

            <Route exact path="/recipe/new" element={<RecipeForm/>}>
            </Route>

            <Route exact path="/recipe/:label" element={<RecipeDetails/>}>
            </Route>

        </Routes>
    )
}

export default NavRoutes;