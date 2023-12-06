const UserModel = require("../models/user.model");

class UserServices {
  static async newUser({ name, lastName, email, password, salt, is_admin }) {
    try {
      const newUser = new UserModel({
        name,
        lastName,
        email,
        password,
        salt,
        is_admin,
      });
      await newUser.setPassword(password);
      return await newUser.save();
    } catch (error) {
      new Error("Error al crear usuario: " + error.message);
    }
  }
  static async login({ email, password }) {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("El usuario no existe.");
    }

    const isValidPassword = await user.validPassword(password);
    if (!isValidPassword) {
      throw new Error("Credenciales inválidas");
    }

    return {
      _id: user._id,
      email: user.email,
      is_admin: user.is_admin,
    };
  }
}
module.exports = UserServices;
