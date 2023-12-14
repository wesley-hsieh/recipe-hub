const express = require("express");
const {NotFoundError} = require("./expressError");
const cors = require("cors");
const {authenticateJWT} = require("./middleware/auth");

const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/users");
const edamamRoutes = require('./routes/edamam');

const app = express();

/** middleware*/
app.use(express.json());
app.use(cors());
app.use(authenticateJWT);

/** Initialize routes */
app.use('/recipes', recipeRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/edamam', edamamRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;