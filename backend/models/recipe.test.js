"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Recipe = require("./recipe");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testJobIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** create */
describe("create", function(){
    const newRecipe = {
        api_uri: "new_api_uri_here",
        title: "new Recipe",
        url: "new_url_here",
        ingredients: "new ingredients here",
        instructions: "new instructions here",
        username: "u1"
    };

    test("Recipe.create() works", async function(){
        let recipe = await Recipe.create(newRecipe);
        expect(recipe).toEqual(newRecipe);

        const result = await db.query(`
            SELECT api_uri, title, url, ingredients, instructions, username 
            FROM recipes 
            WHERE title = 'new Recipe'
        `);
        expect(result.rows).toEqual([
            {
                api_uri: "new_api_uri_here",
                title: "new Recipe",
                url: "new_url_here",
                ingredients: "new ingredients here",
                instructions: "new instructions here",
                username: "u1"
            }
        ]);
    });

    test("check if inserting duplicate recipe fails", async function(){
        try {
            await Recipe.create(newRecipe);
            await Recipe.create(newRecipe);
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/** findAll*/
describe("findAll()", function(){
    test("Recipe.findAll() works", async function(){
        let recipes = await Recipe.findAll();

        expect(recipes).toEqual([
            {
                api_uri: "https://apiurihere.com",
                title: "Dummy recipe 1",
                url: "https://recipe.url.here.com",
                ingredients: "recipe 1 ingredients",
                instructions: "recipe 1 instructions",
                username: "u1"
            },
            {
                api_uri: "https://apiurihere.com",
                title: "Dummy recipe 2",
                url: "https://recipe.url.here.com",
                ingredients: "recipe 2 ingredients",
                instructions: "recipe 2 instructions",
                username: "u1"
            }
        ])
    });

});

/** get */
describe("get",  function(){
    test("Recipe.get() works", async function(){
        let recipe = await Recipe.get("Dummy recipe 1");
        expect(recipe[0]).toEqual({
            api_uri: "https://apiurihere.com",
            title: "Dummy recipe 1",
            url: "https://recipe.url.here.com",
            ingredients: "recipe 1 ingredients",
            instructions: "recipe 1 instructions",
            username: "u1"
        })
    });

    // test("Recipe.get() requires param", async function(){
    //     let recipe = await Recipe.get();
    // });
});

/** update */
describe("update", function(){
    const updateData = {
        url: "https://new.recipe.url.com",
        ingredients: "new ingredients here",
        instructions: "new instructions here"
    };

    test("Recipe.update() works", async function(){
        let recipe = await Recipe.update("Dummy recipe 1", updateData);
        expect(recipe).toEqual({
            title: "Dummy recipe 1",
            api_uri: "https://apiurihere.com",
            ...updateData
        });

        const result = await db.query(
            `SELECT api_uri, title, url, ingredients, instructions, username
           FROM recipes
           WHERE title = 'Dummy recipe 1'`);
        expect(result.rows).toEqual([{
            api_uri: "https://apiurihere.com",
            title: "Dummy recipe 1",
            url: "https://new.recipe.url.com",
            ingredients: "new ingredients here",
            instructions: "new instructions here",
            username: "u1"
        }]);
    });
});

/** remove */

describe("remove", function () {
    test("Recipe.remove() works", async function () {
        await Recipe.remove("Dummy recipe 1");
        const res = await db.query(
            "SELECT title FROM recipes WHERE title='Dummy recipe 1'");
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such company", async function () {
        try {
            await Recipe.remove("nope");
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

