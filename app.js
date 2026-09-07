import express from "express";
import { testdb } from "./src/config/database.js";
import { usersruta } from "./src/routes/user.routes.js";
import { tasksruta } from "./src/routes/task.routes.js";
import { personRoute } from "./src/routes/person.routes.js";
import { rolRoute } from "./src/routes/role.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(usersruta);
app.use(tasksruta);
app.use(personRoute);
app.use(rolRoute);

app.listen(PORT, () => {
  testdb();
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});
