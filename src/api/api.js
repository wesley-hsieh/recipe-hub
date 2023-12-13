import axios from "axios";

const BASE_URL =  process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class RecipeAPI{
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        // console.debug("request urL: ", url);
        const headers = { Authorization: `Bearer ${RecipeAPI.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err);
            // let message = err.response.data.error.message;
            // throw Array.isArray(message) ? message : [message];
        }
    }

    /** Get the current user. */
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get all recipes */
    static async getRecipes(){
        // console.log("GetRecipes");
        let res = await this.request("recipes");
        console.log(res.result);
        return res.result;
    }

    /** Get a recipe based on a certain query */
    static async queryRecipes(name) {
        // console.debug("in queryRecipes: ", name);
        let res = await this.request(`recipes/${name}`);
        // console.log(res);

        const recipes = [...res.queryRecipes, ...res.recipe];
        return {recipes: recipes};
    }

    /** Query backend for recipe(s)
     * Note: hacky solution as the current queryRecipes() function hits an endpoint
     * that returns both the PostgreSQL results and an EdamamAPI result
     * The better solution would be to have two different endpoints in the Node.js backend:
     * one to query from the database, and the other to then query the API and then have the frontend
     * hit both.
     *
     * Regardless, the separation of querying JUST the database and the Edamam api is the issue.
     *
     * returns SQL results.
     * */
    static async queryBackend(name){
        //same endpoint as queryRecipes()
        let res = await this.request(`recipes/${name}`);

        //however just return the 'recipe' portion, which corresponds to the psql data.
        return res.recipe;
    }

    /** Add a recipe to a user's favorites */
    static async addFavorite(username, id){
        let res = await this.request(`users/${username}/recipes/${id}`, {}, "post");
    }

    /** Remove a favorite recipe*/
    static async removeFavorite(username, id){
        let res = await this.request(`users/${username}/recipes/${id}`, {}, "delete");
    }

    /** Get a user's login token based on their username, password*/
    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /** Signup for the site */
    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** Save the user profile (i.e. Update)*/
    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }

    /** Add a recipe to the database*/
    static async addRecipe(data){
        let res = await this.request(`recipes`, data, "post");
        return res;
    }

    /** Check current user's favorite recipes*/
    static async queryFavorites(username){
        let res = await this.request(`users/${username}/favorites`, null, "get");
        return res;
    }
}

export default RecipeAPI;