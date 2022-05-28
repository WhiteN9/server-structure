const uses = require("../data/uses-data");

const list = (req, res) => {
  res.json({ data: uses });
};

const read = (req, res) => {
  res.json({ data: res.locals.use });
};

const destroy = (req, res) => {
  const { useId } = req.params;
  const index = uses.findIndex((use) => use.id === Number(useId));

  if (index > -1) {
    uses.splice(index, 1);
  }
  res.sendStatus(204);
};

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
