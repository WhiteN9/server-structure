const urls = require("../data/urls-data");

const list = (req, res) => {
  res.json({ data: urls });
};

const create = (req, res) => {

};
const read = (req, res) => {
  res.json({ data: res.locals.url });
};

const urlExists = (req, res, next) => {
  const id = req.params.id;
  const foundUrl = urls.find((url) => url.id === Number(id));
  if (foundUrl) {
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
