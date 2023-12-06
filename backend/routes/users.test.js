"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testRecipeIds,
    u1Token,
    u2Token,
    adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("POST /users", function () {
    test("works for admins: create non-admin", async function () {
        const resp = await request(app)
            .post("/users")
            .send({
                username: "u-new",
                firstName: "First-new",
                lastName: "Last-newL",
                password: "password-new",
                email: "new@email.com",
                isAdmin: false,
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            user: {
                username: "u-new",
                firstName: "First-new",
                lastName: "Last-newL",
                email: "new@email.com",
                isAdmin: false,
            }, token: expect.any(String),
        });
    });

    test("works for admins: create admin", async function () {
        const resp = await request(app)
            .post("/users")
            .send({
                username: "u-new",
                firstName: "First-new",
                lastName: "Last-newL",
                password: "password-new",
                email: "new@email.com",
                isAdmin: true,
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            user: {
                username: "u-new",
                firstName: "First-new",
                lastName: "Last-newL",
                email: "new@email.com",
                isAdmin: true,
            }, token: expect.any(String),
        });
    });

    test("unauth for users", async function () {
        const resp = await request(app)
            .post("/users")
            .send({
                username: "u-new",
                firstName: "First-new",
                lastName: "Last-newL",
                password: "password-new",
                email: "new@email.com",
                isAdmin: true,
            })
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .post("/users")
            .send({
                username: "u-new",
                firstName: "First-new",
                lastName: "Last-newL",
                password: "password-new",
                email: "new@email.com",
                isAdmin: true,
            });
        expect(resp.statusCode).toEqual(401);
    });

    test("bad request if missing data", async function () {
        const resp = await request(app)
            .post("/users")
            .send({
                username: "u-new",
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    });

    test("bad request if invalid data", async function () {
        const resp = await request(app)
            .post("/users")
            .send({
                username: "u-new",
                firstName: "First-new",
                lastName: "Last-newL",
                password: "password-new",
                email: "not-an-email",
                isAdmin: true,
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    });
});
