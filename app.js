import express from "express";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});
