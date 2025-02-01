const { Router } = require("express");
const indexController = require("../controllers/indexController");
const { authenticateUser } = require("../lib/middlewares/auth");

const indexRouter = Router();

// GET
indexRouter.get("/", authenticateUser, indexController.indexGet);
indexRouter.get(
	"/create-club/:accountId",
	authenticateUser,
	indexController.createClubGet
);
indexRouter.get("/club/:clubId", authenticateUser, indexController.clubGet);
indexRouter.get(
	"/create-post/:clubId/:accountId",
	indexController.createPostGet
);

// POST
indexRouter.post("/create-club/:accountId", indexController.createClubPost);
indexRouter.post(
	"/create-post/:clubId/:accountId",
	indexController.createPostPost
);

module.exports = indexRouter;
