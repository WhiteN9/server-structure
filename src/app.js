const express = require("express");
const app = express();

const urlsRoute = require("./urls/urls.router");
const usesRoute = require("./uses/uses.router");

app.use(express.json());
app.use("/urls", urlsRoute);
app.use("/uses", usesRoute);

//Route not found handler
app.use((req, res, next) => {
  next({
    status: 404,
    message: `Not found: ${req.originalUrl}`,
  });
});

//Error handler
app.use((err, req, res) => {
  console.error(err);
  const {
    status = 500,
    message = `Internal Error Service! Something went wrong!`,
  } = err;
  res.status(status).json({ err: message });
});

// TODO: Add code to meet the requirements and make the tests pass.

module.exports = app;
