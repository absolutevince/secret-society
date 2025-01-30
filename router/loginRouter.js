const { Router } = require("express");

const loginController = require("../controllers/loginController");

const loginRouter = Router();

loginRouter.get("/", loginController.get);

module.exports = loginRouter;
