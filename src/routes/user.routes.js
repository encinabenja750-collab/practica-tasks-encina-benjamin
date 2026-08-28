import { Router } from "express";
import { obtenerUsuarios } from "../controllers/user.controllers.js";

export const usersruta = Router();

usersruta.get("/api/users", obtenerUsuarios);
