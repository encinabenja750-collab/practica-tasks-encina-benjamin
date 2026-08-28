import { Router } from "express";
import {
  crearUsuario,
  obtenerUsuarios,
} from "../controllers/user.controllers.js";

export const usersruta = Router();

usersruta.get("/api/users", obtenerUsuarios);
usersruta.post("/api/users", crearUsuario);
