"use strict";

/** Routes for recipes*/

const jsonschema = require("jsonschema");
const express = require("express");
const {BadRequestError} = require("../expressError");
const {ensureLoggedIn, ensureCorrectUserOrAdmin, ensureAdmin} = require("../middleware/auth");
const Recipe = require("../models/recipe");
const queryAPI = require("../helpers/api");

const recipeNewSchema = require("../schemas/recipeNewSchema.json");
const recipeUpdateSchema = require("../schemas/recipeUpdateSchema.json");

const router = express.Router();

/** POST / { recipe } =>  { recipe }
 *
 * recipe should be { title, api_uri, url, ingredients, instructions, username }
 *
 * Returns { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: admin
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, recipeNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const recipe = await Recipe.create(req.body);
        return res.status(201).json({ recipe });
    } catch (err) {
        return next(err);
    }
});

/** GET
 * retrieves all recipes from database
 *
 * */

router.get("/", async function(req, res, next){
    try{
        const result = await Recipe.findAll();
        const recipes = result.rows
        return res.json({recipes});
    }catch(err){
        return next(err);
    }
})

/** GET /[title]  =>  { recipe }
 *
 *  Recipe is { title, api_uri, url, ingredients, instructions, username}
 *
 * Authorization required: none
 */

router.get("/:handle", async function (req, res, next) {
    try {
        const recipe = await Recipe.get(req.params.handle);

        const queryRecipes = await queryAPI(req.params.handle);
        console.log(queryRecipes);

        return res.json({ recipe, queryRecipes });
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[handle] { fld1, fld2, ... } => { company }
 *
 * Patches recipe data.
 *
 * fields can be: { title, api_uri, url, ingredients, instructions }
 *
 * Returns { handle, name, description, numEmployees, logo_url }
 *
 * Authorization required: admin
 */

router.patch("/:handle", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, recipeUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const recipe = await Recipe.update(req.params.title, req.body);
        return res.json({ recipe });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[handle]  =>  { deleted: handle }
 *
 * Delete a recipe
 *
 * Authorization: admin or same user
 */

router.delete("/:handle", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        await Recipe.remove(req.params.handle);
        return res.json({ deleted: req.params.handle });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;