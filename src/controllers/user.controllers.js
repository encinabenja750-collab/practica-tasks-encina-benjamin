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

export const crearUsuario = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || name.trim() === "" || name.length > 100) {
    return res.status(400).json({
      message: "Tiene que escribir algo y que no supere los 100 carácteres",
    });
  }

  if (!email || email.trim() === "" || email.length > 100) {
    return res.status(400).json({
      message: "El correo electrónico es obligatorio y máximo 100 carácteres",
    });
  }

  if (!password || password.trim() === "" || password.length > 100) {
    return res.status(400).json({
      message: "La contraseña es obligatoria y de máximo 100 carácteres",
    });
  }

  try {
    const usuarioExistente = await User.findOne({ where: { email: email } });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está registrado." });
    }

    const nuevoUsuario = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "Usuario creado con éxito.",
      data: nuevoUsuario,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrió un error interno",
      error: error.message,
    });
  }
};
