const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

//list all urls
const list = (req, res) => {
  res.json({ data: urls });
};

//get the highest current url ID
let lastUrlId = urls.reduce((maxId, href) => Math.max(maxId, href.id), 0);
//create a new url object with id and href, then push it into the urls data array
const create = (req, res) => {
  const { data: { href } = {} } = req.body;

  const newUrl = {
    id: ++lastUrlId,
    href,
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
};

//get the matched use;
//additional, create a use entry each time read request is made;
let lastUseId = uses.reduce((maxId, use) => Math.max(maxId, use.id), 0);
const read = (req, res) => {
  const { id: urlId } = res.locals.url;
  const newUse = {
    id: ++lastUseId,
    urlId,
    time: Date.now(),
  };
  uses.push(newUse);
  res.json({ data: res.locals.url });
};

//update the current url that has been checked that it exists with new info
const update = (req, res) => {
  const { data: { href } = {} } = req.body;
  const url = res.locals.url;

  url.href = href;

  res.json({ data: url });
};

//check if matched url exists
const urlExists = (req, res, next) => {
  const urlId = req.params.urlId;
  const foundUrl = urls.find((url) => url.id === Number(urlId));
  if (foundUrl) {
    res.locals.url = foundUrl;
    next();
  } else {
    next({
      status: 404,
      message: `Url id not found: ${urlId}`,
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
  urlExists,
};
