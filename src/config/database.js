import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("tasks_users_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const testdb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("Conexión a la base de datos exitosa.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos", error);
  }
};
