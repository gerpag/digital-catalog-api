const UserModel = require("../models/user.model");
const UserServices = require("../services/users.services");
const { validationResult } = require("express-validator");

class UserControllers {
  static async newUser(req, res) {
    try {
      const { name, lastName, email, password, salt, is_admin } = req.body;
      const userExists = await UserModel.findOne({ email: email });
      if (userExists)
        return res.status(400).json("El correo se encuentra registrado");

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      const user = await UserServices.newUser({
        name,
        lastName,
        email,
        password,
        salt,
        is_admin,
      });
      return res.status(201).json({ user });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const userData = await UserServices.login({ email, password });
      return res.status(200).json(userData);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = UserControllers;
