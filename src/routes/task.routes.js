import { Router } from "express";
import { obtenerTareas, crearTarea } from "../controllers/task.controllers.js";

export const tasksruta = Router();

tasksruta.get("/api/tasks", obtenerTareas);
tasksruta.post("/api/tasks", crearTarea);
