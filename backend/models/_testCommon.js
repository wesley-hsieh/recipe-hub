const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testRecipeIds = [];

async function commonBeforeAll(){
    await db.query('DELETE FROM recipes');
    await db.query('DELETE FROM users');
    await db.query('DELETE FROM favorites');

    await db.query(`
        INSERT INTO users (username, password, first_name, last_name, email, is_admin)
        VALUES ('u1', $1, 'name1', 'lastname1', 'email1@gmail.com', FALSE),
               ('u2', $2, 'name2', 'lastname2', 'email2@gmail.com', TRUE)
    `,
        [
            await bcrypt.hash("pass1", BCRYPT_WORK_FACTOR),
            await bcrypt.hash("pass2", BCRYPT_WORK_FACTOR)
        ]
    );

    const recipeResults = await db.query(`
        INSERT INTO recipes (api_uri, title, url, ingredients, instructions, username)
        VALUES ('https://apiurihere.com', 'Dummy recipe 1', 'https://recipe.url.here.com', 'recipe 1 ingredients', 'recipe 1 instructions', 'u1'),
               ('https://apiurihere.com', 'Dummy recipe 2', 'https://recipe.url.here.com', 'recipe 2 ingredients', 'recipe 2 instructions', 'u1')
        RETURNING id
    `);

    testRecipeIds.splice(0, 0, ...recipeResults.rows.map(r=> r.id));
    console.log(testRecipeIds);

    await db.query(`
        INSERT INTO favorites (username, recipe_id)
        VALUES ('u1', ${testRecipeIds[0]}), 
               ('u2', ${testRecipeIds[1]})
    `)

}

async function commonBeforeEach() {
    await db.query('BEGIN');
}

async function commonAfterEach() {
    await db.query('ROLLBACK');
}

async function commonAfterAll() {
    await db.end();
}

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testRecipeIds,
};