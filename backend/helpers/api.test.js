"use strict";

const queryAPI = require("../helpers/api");

describe("queryAPI", function(){
    test("returns a defined response", async function(){
        try{
            const response = queryAPI("cranberry");
            expect(response).toBeDefined();
        }catch(error){
            console.error("Error in test: ", error);
        }
    })
});