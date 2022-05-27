const path = require("path");
const ratings = require(path.resolve("src/data/ratings-data"));

const list = (req, res) => {
  res.json({ data: ratings });
};

const ratingExists = (req, res, next) => {
  const { ratingId } = req.params;
  const ratingFound = ratings.find((rating) => rating.id === Number(ratingId));
  if (ratingFound) {
    res.locals.rating = ratingFound;
    next();
  } else {
    next({
      status: 404,
      message: `Rating id not found: ${ratingId}`,
    });
  }
};
const read = (req, res) => {
  res.json({ data: res.locals.rating });
};
module.exports = { list, read: [ratingExists, read] };
