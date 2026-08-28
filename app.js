import express from "express";
import { testdb } from "./src/config/database.js";
import { usersruta } from "./src/routes/user.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(usersruta);

app.listen(PORT, () => {
  testdb();
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});
