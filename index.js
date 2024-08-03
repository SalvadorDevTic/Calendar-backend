const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config();

//crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//cors
app.use(cors());

//Directorio público
app.use(express.static("public"));

// Lectura y parse del body
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//Excuchar las peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en ${process.env.PORT}`);
});
