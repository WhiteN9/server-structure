const notes = require("../data/notes-data");

const list = (req, res) => {
  res.json({ data: notes });
};

const read = (req, res) => {
  res.json({ data: res.locals.note });
};

const noteExists = (req, res, next) => {
  const { noteId } = req.params;
  const foundNote = notes.find((note) => note.id === Number(noteId));
  if (foundNote) {
    res.locals.note = foundNote;
    return next();
  } else {
    return next({
      status: 404,
      message: `Note id not found: ${noteId}`,
    });
  }
};

const bodyDataHas = (propertyName) => {
  return (req, res, next) => {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      console.log(data[propertyName]);
      return next();
    }
    return next({ status: 400, message: "A 'text' property is required." });
  };
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

const update = (req, res) => {
  const note = res.locals.note;
  const { data: { id, text } = {} } = req.body;

  note.id = id;
  note.text = text;

  res.json({ data: note });
};

const destroy = (req, res) => {
  const { noteId } = req.params;
  const index = notes.findIndex((note) => note.id === Number(noteId));

  notes.splice(index, 1);

  res.sendStatus(204);
};
module.exports = {
  list,
  create: [bodyDataHas("text"), create],
  read: [noteExists, read],
  update: [noteExists, bodyDataHas("text"), update],
  delete: [noteExists, destroy],
};
