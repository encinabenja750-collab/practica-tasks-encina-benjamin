import { Router } from "express";
import {
  obtenerPersonas,
  crearPersona,
} from "../controllers/person.controllers.js";

export const personRoute = Router();

personRoute.get("/api/persons", obtenerPersonas);
personRoute.post("/api/persons", crearPersona);
