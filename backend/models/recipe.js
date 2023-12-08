"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies*/

class Recipe {
    /** Create a recipe (from data), update db, return new recipe data.
     *
     * data should be { api_uri,title,url,ingredients,instructions,username }
     *
     * Returns { api_uri, title, url, ingredients, instructions, username }
     *
     * Throws BadRequestError if company already in database.
     * */

    static async create({label, url, ingredients, instructions, image, username}){
        const checkDuplicate = await db.query(`SELECT label FROM recipes WHERE label= $1`, [label]);

        if (checkDuplicate.rows[0]) throw new BadRequestError(`Duplicate recipe: ${label}`);

        const result = await db.query(
            `INSERT INTO recipes 
            (label, url, ingredients, instructions, image, username) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING label, url, ingredients, instructions, image, username`,
            [ label, url, ingredients, instructions, image, username]
        )

        const recipe = result.rows[0];

        return recipe;
    }

    /** Find all recipes specifically from database
     *
     *  Returns {api_uri, title, url, ingredients, instructions, username} for each recipe found in database
     * */

    static async findAll(){
        const result = await db.query(
            `SELECT label, url, ingredients, instructions, image, username FROM recipes`
        );

        if(!result.rows[0]) throw new NotFoundError(`No recipes in database`);

        return result.rows;
    }

    /** Find all recipes tied to a specific user from database
     * @returns all recipes related
     */

    static async queryByUser(username){
        const result = await db.query(
            `SELECT * FROM recipes WHERE username = $1`,
            [username]
        );

        if(!result.rows[0]) throw new NotFoundError(`This user has no recipes`);

        return result.rows;
    }

    static async update(recipe_label, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                label: "label",
                url: "url",
                ingredients: "ingredients",
                instructions: "instructions"
            }
        );

        const querySql = `UPDATE recipes
                      SET ${setCols}
                      WHERE label = $${values.length + 1}
                      RETURNING title, url, ingredients, instructions, image, username`;

        const result = await db.query(querySql, [...values, recipe_label]);
        const recipe = result.rows[0];

        if (!recipe) throw new NotFoundError(`No recipe found: ${recipe_label}`);

        return recipe;
    }


    /** Delete given recipe from database based on the recipe's title
     *  returns undefined.
     *
     * Throws NotFoundError if recipe not found.
     **/
    static async remove(recipe_label){
        const result = await db.query(
            `DELETE
        FROM recipes
        WHERE label = $1`, [recipe_label]
        );

        if (result.rowCount === 0) {
            throw new NotFoundError(`No recipe: ${recipe_label}`);
        }

        return undefined;
    }


    /** Generic get query from database
     * Assumption of param entered being the recipe title
     *
     * @param param
     * @returns {Promise<void>}
     */

    static async get(param){
        const result = await db.query(
            `SELECT label, url, ingredients, instructions, image, username
            FROM recipes WHERE label = $1`, [param]
        );

        const recipes = result.rows;

        return recipes;
    }
}

module.exports = Recipe;