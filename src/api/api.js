import axios from "axios";

const BASE_URL =  process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class RecipeAPI{
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        // console.debug("request urL: ", url);
        const headers = { Authorization: `Bearer ${RecipeAPI.token}` };
        console.debug("API HEaders: ", headers);
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

    /** Get a recipe based on a certain query
     *
     * Specific endpoint for querying from external Edamam API
     * */
    static async queryRecipes({name, data = null}) {
        console.debug("in queryRecipes: ", name);
        console.debug("data: ", data);

        //if no data is passed, i.e. no contValue is passed in, query normally
        if(!data){
            let res = await this.request(`edamam/${name}`, {data}, "get");
            return {recipes: res.queryRecipes, _cont: res._cont};
        }
        //else,
        else{
            let res = await this.request(`edamam/${name}/page`, {data}, "get");
            return {recipes: res.queryRecipes, _cont:res._cont};
        }
    }

    /** Query backend for recipe(s)
     *
     * Specific endpoint for querying from psql database
     * */
    static async queryBackend(name){
        let res = await this.request(`recipes/${name}`);

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