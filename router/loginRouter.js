const { Router } = require("express");

const loginController = require("../controllers/loginController");
const passport = require("passport");
const { deaunthenticateUser } = require("../lib/middlewares/auth");

const loginRouter = Router();

loginRouter.get("/", deaunthenticateUser, loginController.get);
loginRouter.post(
	"/",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
	})
);

module.exports = loginRouter;
