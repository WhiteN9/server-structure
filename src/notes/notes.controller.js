const notes = require("../data/notes-data");

const list = (req, res) => {
  res.json({ data: notes });
};

const noteExists = (req, res, next) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote) {
    return next();
  } else {
    return next({
      status: 404,
      message: `Note id nonpm t found: ${req.params.noteId}`,
    });
  }
};

const read = (req, res, next) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  res.json({ data: foundNote });
};

const hasText = (req, res, next) => {
  const { data: { text } = {} } = req.body;
  if (text) {
    return next();
  }
  return next({ status: 400, message: "A 'text' property is required." });
};

const create = (req, res, next) => {
  const { data: { text } = {} } = req.body;

  const newNote = {
    id: notes.length + 1, // Assign the next ID
    text,
  };
  notes.push(newNote);
  res.status(201).json({ data: newNote });
};

module.exports = { list, read: [noteExists, read], create: [hasText, create] };
