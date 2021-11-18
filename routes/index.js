const { Router } = require("express");
const usersController = require("./users");
const authController = require("./auth");
const auth = require("../middlewares/auth");
const charactersController = require("./characters");

const router = Router();

router.use("/", authController);
router.use("/users", auth.requiredUser, usersController);
router.use("/characters", charactersController);

module.exports = router;
