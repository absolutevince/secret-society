const { Router } = require("express");

const indexController = require("../controllers/indexController");
const { authenticateUser } = require("../lib/middlewares/auth");

const indexRouter = Router();

indexRouter.get("/", authenticateUser, indexController.indexGet);
indexRouter.get(
	"/create-club",
	authenticateUser,
	indexController.createClubGet
);

module.exports = indexRouter;
