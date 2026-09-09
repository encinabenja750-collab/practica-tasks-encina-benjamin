import { Router } from "express";
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioId,
  actualizarUsuarioId,
  eliminarUsuario,
} from "../controllers/user.controllers.js";
import { validarCrearUsuario } from "../middlewares/usuario.validator.js";
import { validarCampos } from "../middlewares/validarCampos.js";

export const usersruta = Router();

usersruta.get("/api/users", obtenerUsuarios);
usersruta.post(
  "/api/users",
  [validarCrearUsuario, validarCampos],
  crearUsuario,
);
usersruta.get("/api/users/:id", obtenerUsuarioId);
usersruta.put("/api/users/:id", actualizarUsuarioId);
usersruta.delete("/api/users/:id", eliminarUsuario);
