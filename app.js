import express from "express";
import { testdb } from "./src/config/database.js";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  testdb();
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});
