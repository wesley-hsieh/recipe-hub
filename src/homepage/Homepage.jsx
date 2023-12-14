import React, {useContext} from "react";
import UserContext from "../auth/UserContext";
import {Link} from "react-router-dom";
import SearchForm from "../common/SearchForm";

function Homepage(){
    const {currentUser} = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

    return (
        <div>
            <SearchForm/>
        </div>
    )
}




export default Homepage;