import { RoleModel } from "../models/role.model.js";
import { UserModel } from "../models/user.model.js";

export const obtenerRoles = async (req, res) => {
  try {
    const roles = await RoleModel.findAll({
      include: {
        model: UserModel,
        as: "users",
        attributes: ["id", "name", "email"],
      },
    });
    return res.status(200).json({ data: roles });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrió un error interno al obtener los roles",
      error: error.message,
    });
  }
};

export const crearRol = async (req, res) => {
  const { rolename } = req.body;

  if (!rolename || rolename.trim() === "" || rolename.lenght > 100) {
    return res.status(400).json({
      message:
        "El campo rolename es obligatorio y no debe ser mayor a 100 caracteres",
    });
  }
  try {
    const rolExistente = await RoleModel.findOne({
      where: { rolename: rolename.trim() },
    });
    if (rolExistente) {
      return res
        .status(400)
        .json({ message: "Este rol ya se encuentra registrado" });
    }
    const nuevoRol = await RoleModel.create({
      rolename: rolename.trim(),
    });
    return res
      .status(201)
      .json({ message: "Rol creado con éxito", data: nuevoRol });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocurrió un error al crear el rol",
      error: error.message,
    });
  }
};
