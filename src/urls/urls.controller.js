const urls = require("../data/urls-data");

const list = (req, res) => {
  res.json({ data: urls });
};

const read = (req, res) => {};

const urlExists = (req, res, next) => {
  const id = req.params.id;
  const foundUrl = urls.find((url) => url.id === Number(id));
  if (id) {
    res.locals.url = foundUrl;
    next();
  } else {
    next({
      status: 404,
      message: `Url not found`,
    });
  }
};
module.exports = {
  list,
  read: [urlExists, read],
};
