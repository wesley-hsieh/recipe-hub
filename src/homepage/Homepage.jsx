import React, {useContext} from "react";
import UserContext from "../auth/UserContext";
import {Link} from "react-router-dom";

function Homepage(){
    const {currentUser} = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

    return (
        <div>Homepage</div>
    )
}




export default Homepage;