"use strict";

/** Routes for users*/

const express = require('express');
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const {ensureCorrectUserOrAdmin, ensureAdmin} = require("../middleware/auth");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();


/** POST route: only meant for admin usage
 * Adds a new user, returns a user object with an authentication token back.
 * {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: admin
 * */
router.post("/", ensureAdmin, async function(req, res,next){
    try {
        const validator = jsonschema.validate(req.body, userNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.register(req.body);
        const token = createToken(user);
        return res.status(201).json({ user, token });
    } catch (err) {
        return next(err);
    }
});

/** GET all users
 * Returns list of all users.
 *
 * Authorization required: admin
 **/

router.get("/", ensureAdmin, async function (req, res, next) {
    try {
        const users = await User.findAll();
        return res.json({ users });
    } catch (err) {
        return next(err);
    }
});

/** GET a specific user
 * Returns { username, firstName, lastName, isAdmin};
 *
 * Authorization required: admin or same user-as-:username
 **/

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});


/** PATCH, update a user
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.update(req.params.username, req.body);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});


/** DELETE, delete a user
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        await User.remove(req.params.username);
        return res.json({ deleted: req.params.username });
    } catch (err) {
        return next(err);
    }
});

/** POST, add a favorite to a user
 *
 * Returns {"favorited": recipeId}
 *
 * Authorization required: admin or same-user-as-:username
 * */

router.post("/:username/recipes/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const recipeId = +req.params.id;
        await User.applyToJob(req.params.username, recipeId);
        return res.json({ favorited: recipedId });
    } catch (err) {
        return next(err);
    }
});



export default router;