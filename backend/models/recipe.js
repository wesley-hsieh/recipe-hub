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

    static async create({api_uri, title, url, ingredients, instructions, username}){
        const checkDuplicate = await db.query(`SELECT title FROM recipes WHERE title= $1`, [title]);

        if (checkDuplicate.rows[0]) throw new BadRequestError(`Duplicate recipe: ${title}`);

        const result = await db.query(
            `INSERT INTO recipes 
            (api_uri, title, url, ingredients, instructions, username) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING api_uri, title, url, ingredients, instructions, username`,
            [api_uri, title, url, ingredients, instructions, username]
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
            `SELECT * FROM recipes 
            RETURNING 
            api_uri, title, url, ingredients, instructions, username`);

        return result.rows;
    }

    /** Find all recipes tied to a specific user from database
     *
     *
     * @returns
     */

    static async queryByUser(username){
        const result = await db.query(
            `SELECT * FROM recipes WHERE username = $1`,
            [username]
        );

        return result.rows;
    }

    static async update(){

    }

    static async remove(){

    }

}

export default Recipe;