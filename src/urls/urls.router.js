const router = require("express").Router();
const controller = require("./urls.controller");
const usesRoute = require("../uses/uses.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

router.route("/:id").get(controller.read).put(controller.update).all(methodNotAllowed);
module.exports = router;
