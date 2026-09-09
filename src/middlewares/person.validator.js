import { body, param } from "express-validator";
import { PersonModel } from "../models/person.model.js";

export const validarCrearPersona = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El apellido no puede superar los 100 caracteres"),
];

export const validarIdPersona = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID en la URL debe ser un número entero positivo"),

  param("id").custom(async (value) => {
    const personaExiste = await PersonModel.findByPk(value);

    if (!personaExiste) {
      throw new Error(
        "La persona con el ID espcificado no existe en el sistema",
      );
    }
    return true;
  }),
];
