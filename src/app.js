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

  if (foundUser) {
    res.json({ data: foundUser });
  } else {
    next(`User ID not found: ${userId}`);
  }
});

// Return all states from /states in the form of { data: Array }
app.get("/states", (req, res) => {
  res.json({ data: states });
});

// Return a single state from /states/:stateCode in the form of { data: { stateCode: String, name: String } }
app.get("/states/:stateCode", (req, res, next) => {
  const { stateCode } = req.params;

  if (stateCode in states) {
    console.log(
      `{data: { 'stateCode': ${stateCode}, 'name': ${states[stateCode]}}}`
    );
    res.json({
      data: {
        stateCode: stateCode,
        name: states[stateCode],
      },
    });
  } else {
    next(`State code not found: ${stateCode}`);
  }
});

// Not-found handler
app.use((req, res, next) => {
  res.send(`Not found: ${req.originalUrl}`);
});

// Add error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.send(err);
});

module.exports = app;

// const userDetail = JSON.stringify(foundUser);
// res.status(200);
// res.set("Content-Type", "application/json");
// res.send({ data: userDetail });
