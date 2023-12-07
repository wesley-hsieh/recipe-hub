import React from "react";
import {Routes, Navigate, Route} from "react-router-dom";
import Homepage from "../homepage/Homepage";

function NavRoutes({login, signup}){
    console.debug("NavRoutes", `login=${typeof login}`, `signup=${typeof signup}`);

    return (
        <Routes>
            <Route exact path="/">
                <Homepage/>
            </Route>

            <Route exact path="/login">

            </Route>

            <Route exact path="/signup">

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