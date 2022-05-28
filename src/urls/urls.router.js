const router = require("express").Router();
const controller = require("./urls.controller");
const usesRoute = require("../uses/uses.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use("/:urlId/uses", controller.urlExists, usesRoute);
router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);
router
  .route("/:urlId")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;
