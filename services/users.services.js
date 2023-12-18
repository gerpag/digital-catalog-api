const UserModel = require("../models/user.model");
const { generateJWT, verifyJWT } = require("../helpers/helpers.jwt");

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
    if (!user.is_admin) {
      throw new Error("Acceso denegado");
    }
    return {
      _id: user._id,
      email: user.email,
      is_admin: user.is_admin,
      token: generateJWT(user._id, user.is_admin,user.email),
    };
  }
  static async verifyAdmin(token) {
    if (!token) {
      throw new Error("Token no encontrado");
    }
    const decodedToken = verifyJWT(token);
    return decodedToken;
  }
}
module.exports = UserServices;
