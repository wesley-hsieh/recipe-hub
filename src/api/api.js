import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class RecipeAPI{
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${RecipeAPI.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    /** Get the current user. */
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get all recipes */
    static async getRecipes(){
        let res = await this.request("recipes");
        return res.recipes;
    }

    /** Get a recipe based on a certain query */
    static async queryRecipes(name) {
        let res = await this.request("recipes", { name });
        return res.recipes;
    }

    /** Add a recipe to a user's favorites */
    static async addFavorite(username, id){
        let res = await this.request(`users/${username}/recipes/${id}`, "post");
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
}

export default RecipeAPI;