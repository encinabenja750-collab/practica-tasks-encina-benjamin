import { body } from "express-validator";
import { UserModel } from "../models/user.model.js";

export const validarCrearUsuario = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es un campo obligatorio")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede superar los 100 caracteres"),

  body("email")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .isEmail()
    .withMessage("Debe ingresar un formato de correo electrónico válido"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  body("person_id")
    .notEmpty()
    .withMessage("El campo person_id es obligatorio para vincular al usuario")
    .isInt({ min: 1 })
    .withMessage("El person_id debe ser un entero positivo"),

  body("email").custom(async (value) => {
    const emailExistente = await UserModel.findOne({
      where: { email: value.trim() },
    });

    if (emailExistente) {
      throw new Error("El correo electrónico ya se encuentra registrado");
    }
    return true;
  }),
];
