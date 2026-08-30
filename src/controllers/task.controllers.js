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
  const { title, description } = req.body;
  if (!title || title.trim() === "" || title.lenght > 100) {
    return res.status(400).json({
      message: "El título es obligatorio y debe tener máximo 100 carácteres.",
    });
  }
  if (!description || description.trim() === "" || description.lenght > 100) {
    return res.status(400).json({
      message:
        "La descripción es obligatoria y debe tener un máximo de 100 carácteres.",
    });
  }
  try {
    const tareaExistente = await Task.findOne({ where: { title: title } });
    if (tareaExistente) {
      return res
        .status(400)
        .json({ message: "Ya existe una tarea con este nombre." });
    }
    const nuevaTarea = await Task.create({
      title,
      description,
    });
    return res.status(201).json({
      message: "Tarea añadida con éxito.",
      data: nuevaTarea,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrió un error interno al crear la tarea",
      error: error.message,
    });
  }
};

export const obtenerTareaId = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({
        message: "La tarea solicitada no existe.",
      });
    }
    return res.status(200).json({ data: task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrió un error al buscar la tarea",
      error: error.message,
    });
  }
};

export const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  if (!title !== undefined && (title.trim() === "" || title.lenght > 100)) {
    return res.status(400).json({
      message: "El título no puede estar vacío ni ser mayor a 100 carácteres.",
    });
  }
  if (
    description !== undefined &&
    (description.trim() === "" || description.lenght > 100)
  ) {
    return res.status(400).json({
      message:
        "La descripción no puede estar vacía ni ser mayor a 100 carácteres.",
    });
  }
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res
        .status(404)
        .json({ message: "La tarea que intenta actualizar no existe." });
    }
    if (title && title !== task.title) {
      const tituloRepetido = await Task.findOne({ where: { title } });
      if (tituloRepetido) {
        return res
          .status(400)
          .json({ message: "Ya existe una tarea con ese título." });
      }
    }
    task.title = title !== undefined ? title : task.title;
    task.description =
      description !== undefined ? description : task.description;
    task.isComplete = isComplete !== undefined ? isComplete : task.isComplete;
    await task.save();
    return res.status(200).json({
      message: "Tarea actualizada con éxito.",
      data: task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrió un error al actualizar la tarea",
      error: error.message,
    });
  }
};

export const eliminarTarea = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res
        .status(404)
        .json({ message: "La tarea que se desea eliminar no existe." });
    }
    await task.destroy();
    return res.status(200).json({ message: "Tarea eliminada con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrió al intentar eliminar la tarea",
      error: error.message,
    });
  }
};
