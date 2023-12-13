import React, {useContext} from "react";
import UserContext from "../auth/UserContext";
import {Link} from "react-router-dom";
import Searchform from "../common/Searchform";

function Homepage(){
    const {currentUser} = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

    return (
        <div>
            <Searchform/>
        </div>
    )
}




export default Homepage;