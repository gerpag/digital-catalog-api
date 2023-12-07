const express = require("express");
const UserControllers = require("../controllers/users.controllers");
const UserRouter = express.Router();
const {
  newUserValidator,
  loginValidator,
  verifyIsAdmin,
} = require("../middleware/users.middleware");

UserRouter.post("/newUser", newUserValidator, UserControllers.newUser);
UserRouter.get("/login", loginValidator, UserControllers.login);
UserRouter.get("/user", UserControllers.user);
UserRouter.get("/admin", verifyIsAdmin, UserControllers.admin);

module.exports = UserRouter;
