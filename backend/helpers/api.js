"use strict";

const axios = require("axios");
const {APP_ID, APP_KEY} = require("../config");
const {BadRequestError} = require("../expressError");

async function queryAPI(query){
    console.log("in queryAPI")
    const url = `https://api.edamam.com/api/recipes/v2?type=any&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const config = {
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en'
        }
    };

    try{
        const response = await axios.get(url, config);
        console.log(response.data.hits.length);
        return response.data.hits;
    }catch(error){
        throw new BadRequestError();
    }

}

module.exports = queryAPI;