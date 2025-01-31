const { Router } = require("express");

const loginController = require("../controllers/loginController");
const passport = require("passport");

const loginRouter = Router();

loginRouter.get("/", loginController.get);
loginRouter.post(
	"/",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
	})
);

module.exports = loginRouter;
