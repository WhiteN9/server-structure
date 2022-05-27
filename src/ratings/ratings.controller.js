const path = require("path");
const ratings = require(path.resolve("src/data/ratings-data"));

const list = (req, res) => {
  const noteId = Number(req.params.noteId);
  console.log("aaaaaaaaa", noteId);
  let ratingsList = ratings;
  if (noteId) {
    ratingsList = ratings.filter((rating) => rating.noteId === noteId);
  }
  res.json({ data: ratingsList });
  
  //alt :
  //   const noteId = Number(req.params.noteId);
  //   res.json({
  //     data: ratings.filter(
  //       noteId ? (rating) => rating.noteId === noteId : () => true
  //     ),
  //   });
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
