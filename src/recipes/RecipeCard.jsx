import React from "react";

function RecipeCard({image, title, ingredients, url}){
    // console.log(image, title, ingredients, url);

    return (
        <div id={title}>
            <img src={image}></img>
            <p>{title}</p>
            <p>{ingredients}</p>
            <p>{url}</p>
        </div>
    )
}

export default RecipeCard;