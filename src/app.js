const express = require("express");
const app = express();

const urlsRoute = require("./urls/urls.router");
const usesRoute = require("./uses/uses.router");

app.use(express.json());
app.use("/urls", urlsRoute);
app.use("/uses", usesRoute);

//Route not found handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

//Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const { status = 500, message = `Something went wrong!` } = err;
  res.status(status).json({ error: message });
});

module.exports = app;
