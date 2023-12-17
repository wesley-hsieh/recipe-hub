"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError, UnauthorizedError} = require("../expressError");
const User = require("./user");
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

/** authenticate */

describe("authenticate", function () {
    test("User.authenticate() works", async function () {
        const user = await User.authenticate("u1", "pass1");
        expect(user).toEqual({
            username: "u1",
            firstName: "name1",
            lastName: "lastname1",
            email: "email1@gmail.com",
            isAdmin: false,
        });
    });

    test("unauth if no such user", async function () {
        try {
            await User.authenticate("nope", "password");
            fail();
        } catch (err) {
            expect(err instanceof UnauthorizedError).toEqual(true);
        }
    });

    test("unauth if wrong password", async function () {
        try {
            await User.authenticate("u1", "wrong");
            fail();
        } catch (err) {
            expect(err instanceof UnauthorizedError).toEqual(true);
        }
    });
});


/** register */

describe("register", function () {
    const newUser = {
        username: "new",
        firstName: "Test",
        lastName: "Tester",
        email: "test@test.com",
        isAdmin: false,
    };

    test("works", async function () {
        let user = await User.register({
            ...newUser,
            password: "password",
        });
        expect(user).toEqual(newUser);
        const found = await db.query("SELECT * FROM users WHERE username = 'new'");
        expect(found.rows.length).toEqual(1);
        expect(found.rows[0].is_admin).toEqual(false);
        expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
    });

    test("works: adds admin", async function () {
        let user = await User.register({
            ...newUser,
            password: "password",
            isAdmin: true,
        });
        expect(user).toEqual({ ...newUser, isAdmin: true });
        const found = await db.query("SELECT * FROM users WHERE username = 'new'");
        expect(found.rows.length).toEqual(1);
        expect(found.rows[0].is_admin).toEqual(true);
        expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
    });

    test("bad request with dup data", async function () {
        try {
            await User.register({
                ...newUser,
                password: "password",
            });
            await User.register({
                ...newUser,
                password: "password",
            });
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/** findAll */

describe("findAll", function () {
    test("works", async function () {
        const users = await User.findAll();
        expect(users).toEqual([
            {
                username: "u1",
                firstName: "name1",
                lastName: "lastname1",
                email: "email1@gmail.com",
                isAdmin: false,
            },
            {
                username: "u2",
                firstName: "name2",
                lastName: "lastname2",
                email: "email2@gmail.com",
                isAdmin: true,
            },
        ]);
    });
});

/** get */

describe("get", function () {
    test("works", async function () {
        let user = await User.get("u1");
        expect(user).toEqual({
            username: "u1",
            firstName: "name1",
            lastName: "lastname1",
            email: "email1@gmail.com",
            isAdmin: false,
            recipes: []
        });
    });

    test("not found if no such user", async function () {
        try {
            await User.get("nope");
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toEqual(true);
        }
    });
});

/** update */

describe("update", function () {
    const updateData = {
        firstName: "NewF",
        lastName: "NewF",
        email: "new@email.com",
        isAdmin: true,
    };

    test("works", async function () {
        let job = await User.update("u1", updateData);
        expect(job).toEqual({
            username: "u1",
            ...updateData,
        });
    });

    test("works: set password", async function () {
        let job = await User.update("u1", {
            password: "new",
        });
        expect(job).toEqual({
            username: "u1",
            firstName: "name1",
            lastName: "lastname1",
            email: "email1@gmail.com",
            isAdmin: false,
        });
        const found = await db.query("SELECT * FROM users WHERE username = 'u1'");
        expect(found.rows.length).toEqual(1);
        expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
    });

    test("not found if no such user", async function () {
        try {
            await User.update("nope", {
                firstName: "test",
            });
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });

    test("bad request if no data", async function () {
        expect.assertions(1);
        try {
            await User.update("c1", {});
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/** remove */

describe("remove", function () {
    test("works", async function () {
        await User.remove("u1");
        const res = await db.query(
            "SELECT * FROM users WHERE username='u1'");
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such user", async function () {
        try {
            await User.remove("nope");
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

