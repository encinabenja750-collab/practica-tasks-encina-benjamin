import { Router } from "express";
import { obtenerRoles, crearRol } from "../controllers/role.controllers.js";

export const rolRoute = Router();

rolRoute.get("/api/roles", obtenerRoles);
rolRoute.post("/api/roles", crearRol);
