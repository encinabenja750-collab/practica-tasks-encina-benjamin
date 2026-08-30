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

export const obtenerUsuarioId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res
        .status(404)
        .json({ message: "El usuario solicitado no existe." });
    }
    return res.status(200).json({ data: usuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrió un error al buscar el usuario",
      error: error.message,
    });
  }
};

export const actualizarUsuarioId = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.boy;

  if (name !== undefined && (name.trirm() === "" || name.lenght > 100)) {
    return res.status(400).json({
      message: "El nombre no puede estar vacío ni ser mayor a 100 carácteres",
    });
  }
  if (email !== undefined && (email.trim() === "" || email.lenght > 100)) {
    return res.status(400).json({
      message:
        "El correo eléctronico no puede estar vacío ni ser mayor a 100 carácteres",
    });
  }
  if (
    password !== undefined &&
    (password.trim() === "" || password.lenght > 100)
  ) {
    return res.status(400).json({
      message:
        "La contraseña no puede estar vacía ni ser mayor a 100 carácteres",
    });
  }
  try {
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res
        .status(404)
        .json({ message: "El usuario que intenta actualizar no existe" });
    }
    if (email && email.trim() !== usuario.email.trim()) {
      const emailRepetido = await User.findOne({
        where: { email: email.trim() },
      });
      if (emailRepetido) {
        return res
          .status(400)
          .json({ message: "El correo electrónico ya está registrado" });
      }
    }
    usuario.name = name !== undefined ? name : usuario.name;
    usuario.email = email !== undefined ? email : usuario.email;
    usuario.password = password !== undefined ? password : usuario.password;

    await usuario.save();

    return res.status(200).json({
      message: "Usuario actualizado con éxito",
      data: usuario,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrió un error al actualizar el usuario",
      error: error.message,
    });
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        message: "No se puede eliminar porque el usuario no existe",
      });
    }
    await usuario.destroy();
    return res.status(200).json({
      message: "Usuario eliminado con éxito",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrió un error al intentar elminar el usuario",
      error: error.message,
    });
  }
};
