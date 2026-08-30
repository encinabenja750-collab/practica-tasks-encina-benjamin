import { Router } from "express";
import {
  obtenerTareas,
  crearTarea,
  obtenerTareaId,
  actualizarTarea,
  eliminarTarea,
} from "../controllers/task.controllers.js";

export const tasksruta = Router();

tasksruta.get("/api/tasks", obtenerTareas);
tasksruta.post("/api/tasks", crearTarea);
tasksruta.get("/api/tasks/:id", obtenerTareaId);
tasksruta.put("/api/tasks/:id", actualizarTarea);
tasksruta.delete("/api/tasks/:id", eliminarTarea);
