const express = require("express");
const morgan = require("morgan");
const app = express();

const users = require("./data/users-data");
const states = require("./data/states-data");

//PIPELINE START
app.use(morgan("common"));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("hello");
});

// Return an array of users from /users in form of { data: Array }
app.get("/users", (req, res) => {
  res.json({ data: users });
});

// Return a single user by id from /users/:userId in form of { data: Object }
app.get("/users/:userId", (req, res, next) => {
  const { userId } = req.params;
  const foundUser = users.find((user) => user.id === Number(userId));

  const userDetail = JSON.stringify(foundUser);
  res.status(200);
  res.set("Content-Type", "application/json");
  res.send({ data: userDetail });

});

// // TODO: return all states from /states in the form of { data: Array }
// app.get;

// // TODO: Return a single state from /states/:stateCode in the form of { data: { stateCode: String, name: String } }
// app.get;

// Not-found handler
app.use((req, res, next) => {
  res.send(`Not found: ${req.originalUrl}`);
});
// // TODO: Add error handler
// app.use;

module.exports = app;
