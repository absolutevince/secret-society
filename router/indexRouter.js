const { Router } = require("express");

const indexController = require("../controllers/indexController");
const { authenticateUser } = require("../lib/middlewares/auth");

const indexRouter = Router();

// GET
indexRouter.get("/", authenticateUser, indexController.indexGet);
indexRouter.get(
	"/create-club",
	authenticateUser,
	indexController.createClubGet
);
indexRouter.get("/club/:id", indexController.clubGet);

// POST
indexRouter.post("/create-club", indexController.createClubPost);

module.exports = indexRouter;
