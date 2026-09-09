import { body } from "express-validator";
import { UserModel } from "../models/user.model.js";

export const validarCrearTarea = [
  body("title")
    .notEmpty()
    .withMessage("El título de la tarea es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El título no puede superar los 100 caracteres"),

  body("description")
    .notEmpty()
    .withMessage("La descripción de la tarea es obligatoria")
    .isLength({ max: 100 })
    .withMessage("La descripción no puede superar los 100 caracteres"),

  body("user_id")
    .notEmpty()
    .withMessage("El campo user_id es obligatorio para asociar la tarea")
    .isInt({ min: 1 })
    .withMessage("El user_id debe ser un número entero positivo"),

  body("user_id").custom(async (value) => {
    const usuarioExiste = UserModel.findByPk(value);

    if (!usuarioExiste) {
      throw new Error("El usuario especificado no existe en el sistema");
    }

    return true;
  }),
];
