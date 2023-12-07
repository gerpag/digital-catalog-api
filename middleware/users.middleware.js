const { verifyJWT } = require("../helpers/helpers.jwt");

const { body } = require("express-validator");
newUserValidator = [
  body("email").isEmail().withMessage("Formato email incorrecto"),
  body("email").notEmpty().withMessage("El campo email no puede estar vacio"),

  body("password").notEmpty().withMessage("Contraseña es requerido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Contraseña minima 6 caracteres"),

  body("password")
    .matches(/\d/)
    .withMessage("Contraseña requiere que contenga al menos un número"),
  body("password")
    .matches(/[A-Z]/)
    .withMessage("Contraseña requiere una letra Mayúscula"),
];
loginValidator = [
  body("email").isEmail().withMessage("Formato email incorrecto"),
  body("email").notEmpty().withMessage("El campo email no puede estar vacio"),

  body("password").notEmpty().withMessage("Contraseña es requerido"),
];
function verifyIsAdmin(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ error: "Token no encontrado en las cookies" });
  }

  const decodedToken = verifyJWT(token);
  if (!decodedToken.payload.is_admin) {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  next();
}
module.exports = { newUserValidator, loginValidator, verifyIsAdmin };
