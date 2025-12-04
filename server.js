import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Usuario from "./src/app/core/models/User.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("¡¡¡Conectado a MongoDB!!!"))
  .catch(err => console.log("Error al conectarse a MongoDB :(", err));

mongoose.connection.on("connected", () => {
  console.log("Base conectada:", mongoose.connection.db.databaseName);
});

// Ruta de login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Datos recibidos:", req.body);

  try {
    // Busca en la colección "usuarios"
    const user = await Usuario.findOne({ username, password });
    console.log("Resultado de búsqueda:", user);

    res.json({ message: "Login exitoso", user });
  } catch (error) {
    console.error("Error al buscar usuario:", error);
  }
});


app.post("/api/registro", async (peticion, respuesta) => {
  const { username,password,email, dni} = peticion.body;
  console.log("Datos de registro recibidos: ", peticion.body);

  try {
    const usuarioCreado = new Usuario ({
      username: username,
      password: password,
      email: email,
      dni: dni,
      rol : "jugador"
    });
      await usuarioCreado.save();

      respuesta.json({message: "Usuario registrado con exito", usuarioCreado});

  } catch (error) {
    console.log("Error al crear el usuario: ", error);
    respuesta.status(400).json({ error: error.message });
  }


});


// CRUD de usuarios (jugadores)
// Obtener todos
app.get("/api/users", async (req, res) => {
  try {
    const users = await Usuario.find();
    res.json(users);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
});

// Crear usuario
app.post("/api/users", async (req, res) => {
  try {
    const nuevo = new Usuario(req.body);
    await nuevo.save();
    res.json({ message: "Usuario creado", nuevo });
  } catch (error) {
    console.error("Error creando usuario:", error);
    res.status(400).json({ error: error.message });
  }
});

// Editar usuario
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const actualizado = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Usuario actualizado", actualizado });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    res.status(400).json({ error: error.message });
  }
});

// Borrar usuario
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Usuario.findByIdAndDelete(id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    res.status(400).json({ error: error.message });
  }
});


// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
