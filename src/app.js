const express = require("express");
const app = express();
const notes = require("./data/notes-data");

app.use(express.json());

app.get("/notes/:noteId", (req, res, next) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote) {
    res.json({ data: foundNote });
  } else {
    next(`Note id not found: ${noteId}`);
  }
});

app.get("/notes", (req, res) => {
  res.json({ data: notes });
});

//Get the largest assigned ID;
let lastNoteId = notes.reduce((maxId, note) => Math.max(maxId, note.id), 0);

// Ability to create a new note
app.post("/notes", (req, res, next) => {
  //validate it is an appropriate note
  // console.log(req.body);
  const { data: { text } = {} } = req.body;
  //store note in our date file
  if (text) {
    const newNote = {
      id: ++lastNoteId,
      text,
    };
    notes.push(newNote);
    //send back JSON response
    res.status(201).json({ data: newNote });
  } else {
    return res.status(400).json({ error: `Required text is missing` });
  }
});

// Route not-found handler
app.use((req, res, next) => {
  res.status(400).send(`Not found: ${req.originalUrl}`);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(400).send(err);
});

module.exports = app;
