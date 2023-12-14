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
        // console.log(response.data.hits.length);
        const nextUrl = response.data._links.next.href;
        console.log("nexturl", nextUrl);
        const urlObj = new URL(nextUrl);
        console.log("urlObj", urlObj);
        const contValue = urlObj.searchParams.get('_cont');
        console.log("contValue:", contValue);
        return {queryRecipes: response.data.hits, _cont: contValue};
    }catch(error){
        throw new BadRequestError();
    }

}

async function queryPage(query, cont){
    console.log("in queryPage");
    const url = `https://api.edamam.com/api/recipes/v2?type=any&q=${query}&_cont=${cont}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const config = {
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en'
        }
    };

    try {
        const response = await axios.get(url, config);
        const nextUrl = response.data._links.next.href;
        console.log("nexturl", nextUrl);
        const urlObj = new URL(nextUrl);
        console.log("urlObj", urlObj);
        const newContValue = urlObj.searchParams.get('_cont');
        console.log("newContValue:", newContValue);
        return { queryRecipes: response.data.hits, _cont: newContValue };
    } catch (error) {
        throw new BadRequestError();
    }

}



module.exports = {
    queryAPI,
    queryPage
};