const urls = require("../data/urls-data");

const list = (req, res) => {
  res.json({ data: urls });
};

let lastUrlId = urls.reduce((maxId, href) => Math.max(maxId, href.id), 0);
const create = (req, res) => {
  const { data: { href } = {} } = req.body;

  const newUrl = {
    id: ++lastUrlId,
    href,
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
};

const read = (req, res) => {
  res.json({ data: res.locals.url });
};

const update = (req, res) => {
  const { data: { href } = {} } = req.body;
  const url = res.locals.url;

  url.href = href;

  res.json({ data: url });
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
      message: `Url id not found: ${id}`,
    });
  }
};

const bodyHasProperty = (propertyName) => {
  return (req, res, next) => {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName}` });
  };
};

module.exports = {
  list,
  create: [bodyHasProperty("href"), create],
  read: [urlExists, read],
  update: [urlExists, bodyHasProperty("href"), update],
};
