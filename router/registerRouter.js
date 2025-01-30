const { Router } = require("express");

const registerController = require("../controllers/registerController");

const registerRouter = Router();

registerRouter.get("/", registerController.get);
registerRouter.post("/", registerController.post);

module.exports = registerRouter;
