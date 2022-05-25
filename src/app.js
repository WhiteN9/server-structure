const express = require("express");
const app = express();

const users = require("./data/users-data");
const states = require("./data/states-data");

// TODO: return an array of users from /users in form of { data: Array }
app.get("/users-data", (res,req) => {
    const users = JSON.stringify(booksData);
});
// TODO: return a single user by id from /users/:userId in form of { data: Object }
app.get;
// TODO: return all states from /states in the form of { data: Array }
app.get;

// TODO: Return a single state from /states/:stateCode in the form of { data: { stateCode: String, name: String } }
app.get;

// TODO: add not-found handler
app.use;
// TODO: Add error handler
app.use;

module.exports = app;
