"use strict";

/** NavRoutes for recipes*/

const jsonschema = require("jsonschema");
const express = require("express");
const {BadRequestError} = require("../expressError");
const {ensureLoggedIn, ensureCorrectUserOrAdmin, ensureAdmin} = require("../middleware/auth");
const Recipe = require("../models/recipe");
const {queryAPI, queryPage} = require("../helpers/api");

const recipeNewSchema = require("../schemas/recipeNewSchema.json");
const recipeUpdateSchema = require("../schemas/recipeUpdateSchema.json");

const router = express.Router();


/** GET /[label]  =>  { recipes }
 *
 *  Recipes is an array of { id, label, api_uri, url, ingredients, instructions, username}
 *
 * Authorization required: none
 */

router.get("/:label", async function (req, res, next) {
    console.log("in /edamam/:label");
    // console.log("req:", req);
    //
    // const cont = req.query.data.contValue ? req.query.data.contValue : null;
    //
    // console.log("req.query.data.contValue: ", cont);

    try {
        const response = await queryAPI(req.params.label);
        return res.json({ queryRecipes: response.queryRecipes, _cont: response._cont });
    } catch (err) {
        return next(err);
    }
});


/** Get /[label]/[page] => {recipes}
 *
 * Recipes is an array of {id, label, api_uri, url, ingredients, instructions, username}
 *
 * label being the query parameter that is sent by the user
 * page not referring to a literal page, but just to differentiate between the two calls
 *
 * Authorization required: non
 * */

router.get("/:label/page", async function(req, res, next){
    try{
        const response = await queryPage(req.params.label, req.query.data.contValue);
        return res.json({queryRecipes: response.queryRecipes, _cont: response._cont});
    }catch(err){
        return next(err);
    }
})



module.exports = router;