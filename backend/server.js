"use strict";

const app = require("./app");
const { PORT } = require("./config");

const BASE_URL =  process.env.REACT_APP_BASE_URL || "localhost:3001";

app.listen(PORT, function () {
    console.log(`Started on ${BASE_URL}:${PORT}`);
});
