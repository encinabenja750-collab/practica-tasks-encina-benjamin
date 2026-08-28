import { User } from "../models/user.model.js";

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    return res.status(200).json({ data: usuarios });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrió un error al obtener los usuarios",
      error: error.message,
    });
  }
};
