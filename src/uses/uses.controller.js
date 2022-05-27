const uses = require("../data/uses-data");

const list = (req, res) => {
  res.json({ data: uses });
};

module.exports = {
  list,
};
