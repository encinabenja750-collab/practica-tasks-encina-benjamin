import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";

export const obtenerPersonas = async (req, res) => {
  try {
    const personas = await PersonModel.findAll({
      include: {
        model: UserModel,
        as: "user",
        attributes: ["id", "email"],
      },
    });
    return res.status(200).json({ data: personas });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al obtener las personas", error: error.message });
  }
};

export const crearPersona = async (req, res) => {
  const { name, lastname } = req.body;

  if (!name || name.trim() === "" || name.lenght > 100) {
    return res.status(400).json({
      message: "El nombre es obligatorio y debe tener máximo 100 caracteres",
    });
  }
  if (!lastname || lastname.trim() === "" || lastname.lenght > 100) {
    return res.status(400).json({
      message: "El apellido es obligatorio y debe tener máximo 100 caracteres",
    });
  }
  try {
    const nuevaPersona = await PersonModel.create({ name, lastname });
    return res.status(200).json({
      message: "Persona creada con éxito",
      data: nuevaPersona,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al crear la persona", error: error.message });
  }
};
