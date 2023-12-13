"use strict";

/** NavRoutes for recipes*/

const jsonschema = require("jsonschema");
const express = require("express");
const {BadRequestError} = require("../expressError");
const {ensureLoggedIn, ensureCorrectUserOrAdmin, ensureAdmin} = require("../middleware/auth");
const Recipe = require("../models/recipe");
const queryAPI = require("../helpers/api");

const recipeNewSchema = require("../schemas/recipeNewSchema.json");
const recipeUpdateSchema = require("../schemas/recipeUpdateSchema.json");

const router = express.Router();


/** GET /[title]  =>  { recipe }
 *
 *  Recipe is { title, api_uri, url, ingredients, instructions, username}
 *
 * Authorization required: none
 */

router.get("/:handle", async function (req, res, next) {
    try {
        const queryRecipes = await queryAPI(req.params.handle);
        return res.json({ queryRecipes });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;