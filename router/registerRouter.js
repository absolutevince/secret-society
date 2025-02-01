const { Router } = require("express");

const registerController = require("../controllers/registerController");
const { deaunthenticateUser } = require("../lib/middlewares/auth");

const registerRouter = Router();

registerRouter.get("/", deaunthenticateUser, registerController.get);
registerRouter.post("/", registerController.post);

module.exports = registerRouter;
