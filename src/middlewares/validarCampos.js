import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      message: "Errores de validación de entrada",
      errors: errores.mapped(),
    });
  }
  next();
};
