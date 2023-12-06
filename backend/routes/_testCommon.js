"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Recipe = require("../models/recipe");
const { createToken } = require("../helpers/tokens");

const testRecipeIds = [];

async function commonBeforeAll(){
    await db.query(`DELETE FROM users`);
    await db.query(`DELETE FROM recipes`);
    await db.query(`DELETE FROM favorites`);

    testRecipeIds[0] = (await Recipe.create(
        {
            api_uri: 'https://apiurihere.com',
            title: 'Dummy recipe 1',
            url: 'https://recipe.url.here.com',
            ingredients: 'recipe 1 ingredients',
            instructions: 'recipe 1 instructions',
            username: 'u1'
        }
    )).id;
    testRecipeIds[1] = (await Recipe.create(
        {
            api_uri: 'https://apiurihere.com',
            title: 'Dummy recipe 2',
            url: 'https://recipe.url.here.com',
            ingredients: 'recipe 2 ingredients',
            instructions: 'recipe 2 instructions',
            username: 'u2'
        }
    )).id;

    await User.register({
        username: "u1",
        password: "pass1",
        firstName: "name1",
        lastName: "lastname1",
        email: "email1@gmail.com",
        isAdmin: false
    });
    await User.register({
        username: "u2",
        password: "pass2",
        firstName: "name2",
        lastName: "lastname2",
        email: "email2@gmail.com",
        isAdmin: true
    });

    await User.addFavorite("u1", testRecipeIds[0]);
}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}


const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });


module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testRecipeIds,
    u1Token,
    u2Token,
    adminToken,
};
