const uses = require("../data/uses-data");

//list all the uses
const list = (req, res) => {
  res.json({ data: uses });
};

//get the matched use
const read = (req, res) => {
  res.json({ data: res.locals.use });
};

//delete use if it exists in the data file
const destroy = (req, res) => {
  const { useId } = req.params;
  const index = uses.findIndex((use) => use.id === Number(useId));

  if (index > -1) {
    uses.splice(index, 1);
  }
  res.sendStatus(204);
};

//check if matched use exists
const usesExists = (req, res, next) => {
  const useId = req.params.useId;
  const foundUse = uses.find((use) => use.id === Number(useId));
  if (foundUse) {
    res.locals.use = foundUse;
    next();
  } else {
    next({
      status: 404,
      message: `Use ID not found: ${useId}`,
    });
  }
};

module.exports = {
  list,
  read: [usesExists, read],
  delete: [usesExists, destroy],
};
