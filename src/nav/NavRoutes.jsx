import React, {useContext, useEffect, useState} from "react";
import UserContext from "../auth/UserContext";
import {Routes, Navigate, Route} from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import RecipeList from "../recipes/RecipeList";
import User from "../users/User";
import UserEditForm from "../users/UserEditForm";
import RecipeAPI from "../api/api";
import RecipeForm from "../recipes/RecipeForm";

function NavRoutes({login, signup}){
    const { currentUser, recipes, setRecipes } = useContext(UserContext);
    console.debug("NavRoutes", `login=${typeof login}`, `signup=${typeof signup}`);

    useEffect(() => {
        async function fetchRecipes(){
            try{
                const allRecipes = await RecipeAPI.getRecipes();
                // console.log("allRecipes:", allRecipes);
                setRecipes(allRecipes);
            }catch(err){
                console.error(err);
            }
        }
        fetchRecipes();
    }, []);

    return (
        <Routes>
            <Route exact path="/" element={<Homepage/>}>
            </Route>

            <Route exact path="/login" element={<LoginForm login={login}/>}>
            </Route>

            <Route exact path="/signup" element={<SignupForm signup={signup}/> }>
            </Route>

            <Route exact path="/recipes" element={<RecipeList recipes={recipes}/>}>
            </Route>

            <Route exact path="/profile" element={<User/>}></Route>

            <Route exact path="/user/edit" element={<UserEditForm/>}></Route>

            <Route exact path="/recipe/new" element={<RecipeForm/>}>
            </Route>


        </Routes>
    )
}




export default NavRoutes;