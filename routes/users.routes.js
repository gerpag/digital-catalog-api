const express = require("express");
const UserControllers = require("../controllers/users.controllers");
const UserRouter = express.Router();
const {
  newUserValidator,
  loginValidator,
} = require("../middleware/users.middleware");

UserRouter.post("/newUser", newUserValidator, UserControllers.newUser);
UserRouter.get("/login", loginValidator, UserControllers.login);

module.exports = UserRouter;
