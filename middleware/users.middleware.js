const { body } = require("express-validator");
exports.newUserValidator = [
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
exports.loginValidator = [
  body("email").isEmail().withMessage("Formato email incorrecto"),
  body("email").notEmpty().withMessage("El campo email no puede estar vacio"),

  body("password").notEmpty().withMessage("Contraseña es requerido"),
];
