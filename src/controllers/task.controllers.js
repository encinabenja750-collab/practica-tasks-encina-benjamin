import { Task } from "../models/task.model.js";

export const obtenerTareas = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json({ data: tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrió un error al obtener las tareas",
      error: error.message,
    });
  }
};

export const crearTarea = async (req, res) => {
    const {title, description} = req.body;
    if (!title || title.trim() === "" || title.lenght > 100) {
        return res.status(400).json({message: "El título es obligatorio y debe tener máximo 100 carácteres."});
    }
    if (!description || description.trim() === "" || description.lenght > 100) {
        return res.status(400).json({message: "La descripción es obligatoria y debe tener un máximo de 100 carácteres."});
    }
    try {
        const tareaExistente = await Task.findOne({where: {title: title}});
        if (tareaExistente) {
            return res.status(400).json({message: "Ya existe una tarea con este nombre."});
        }
        const nuevaTarea = await Task.create({
            title,
            description
        });
        return res.status(201).json({
            message: "Tarea añadida con éxito.",
            data: nuevaTarea
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error interno al crear la tarea",
            error: error.message
        });
    }
}
