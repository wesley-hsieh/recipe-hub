import React from "react";
import {Routes, Navigate, Route} from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";

function NavRoutes({login, signup}){
    console.debug("NavRoutes", `login=${typeof login}`, `signup=${typeof signup}`);

    return (
        <Routes>
            <Route exact path="/" element={<Homepage/>}>
            </Route>

            <Route exact path="/login" element={<LoginForm login={login}/>}>
            </Route>

            <Route exact path="/signup" element={<SignupForm signup={signup}/> }>
            </Route>

            {/*<Route exact path={}>*/}

            {/*</Route>*/}

            {/*<Route exact path={}>*/}

            {/*</Route>*/}

            {/*<Route exact path={}>*/}

            {/*</Route>*/}

            {/*<Route exact path={}>*/}

            {/*</Route>*/}


        </Routes>
    )
}




export default NavRoutes;