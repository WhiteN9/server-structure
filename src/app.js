const express = require("express");
const app = express();

const notes = require("./data/notes-data");

app.get("/notes/:noteId", (req, res) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote) {
    res.json({ data: foundNote });
  } else {
    res.sendStatus(400);
  }
});

app.get("/notes", (req, res) => {
  if (req) {
    console.log(req.body);
    res.json({ data: notes });
  } else {
    res.sendStatus(400);
  }
});

//Get the largest assigned ID;
let lastNoteId = notes.reduce((maxId, note) => Math.max(maxId, note.id), 0);
// Ability to create a new note
app.post("/notes", (req, res, next) => {
  //validate it is an appropriate note
  console.log(req.body);
  const { data: { text } = {} } = req.body;
  //store note in our date file
  const newNote = {
    id: ++lastNoteId,
    text,
  };

  notes.push(newNote);
  //send back JSON response
  res.json({ data: newNote });
});

// Not-found handler
app.use((req, res, next) => {
  res.send(`Note id not found: ${req.params.noteId}`);
});

// Error handler
app.use((err, req, res, next) => {
  res.send(`Not found: ${req.originalUrl}`);
});

module.exports = app;
