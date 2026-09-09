import { Router } from "express";
import {
  obtenerPersonas,
  crearPersona,
} from "../controllers/person.controllers.js";
import {
  validarCrearPersona,
  validarIdPersona,
} from "../middlewares/person.validator.js";
import { validarCampos } from "../middlewares/validarCampos.js";

export const personRoute = Router();

personRoute.get(
  "/api/persons/:id",
  [validarIdPersona, validarCampos],
  obtenerPersonas,
);
personRoute.post(
  "/api/persons",
  [validarCrearPersona, validarCampos],
  crearPersona,
);

personRoute.get("/api/persons", obtenerPersonas);
