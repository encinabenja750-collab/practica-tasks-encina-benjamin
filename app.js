import express from "express";
import { testdb } from "./src/config/database.js";
import { usersruta } from "./src/routes/user.routes.js";
import { tasksruta } from "./src/routes/task.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(usersruta);
app.use(tasksruta);

app.listen(PORT, () => {
  testdb();
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});
