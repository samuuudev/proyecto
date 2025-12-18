import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Usuario from "./src/app/core/models/User.js";
import Partido from "./src/app/core/models/Partido.js";
import Jugador from "./src/app/core/models/Jugador.js";

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
  const { username, password, email, dni, equipo, posicion } = peticion.body;
  console.log("Datos de registro recibidos: ", peticion.body);

  try {
    const usuarioCreado = new Usuario({
      username: username,
      password: password,
      email: email,
      dni: dni,
      rol: "jugador"
    });
    await usuarioCreado.save();

    // Si se proporcionó información de jugador, crear documento en colección 'jugadores'
    let jugadorCreado = null;
    try {
      jugadorCreado = new Jugador({
        userId: usuarioCreado._id,
        equipo: equipo || null,
        posicion: posicion || null,
      });
      await jugadorCreado.save();
    } catch (jErr) {
      console.error('Error creando documento jugador:', jErr);
    }

    respuesta.json({ message: "Usuario registrado con exito", usuarioCreado, jugadorCreado });

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


// Partidos

// Obtener todos los partidos
app.get("/api/partidos", async (req, res) => {
  try {
    const partidos = await Partido.find();
    res.json(partidos);
  } catch (error) {
    console.error("Error obteniendo partidos:", error);
    res.status(500).json({ error: "Error obteniendo partidos" });
  }
});

// Crear un nuevo partido
app.post("/api/partidos", async (req, res) => {
  try {
    const nuevoPartido = new Partido(req.body);
    await nuevoPartido.save();
    res.json({ message: "Partido creado", nuevoPartido });
  } catch (error) {
    console.error("Error creando partido:", error);
    res.status(400).json({ error: error.message });
  }
});

// Editar partido
app.put("/api/partidos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const actualizado = await Partido.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Partido actualizado", actualizado });
  } catch (error) {
    console.error("Error actualizando partido:", error);
    res.status(400).json({ error: error.message });
  }
});

// Borrar partido
app.delete("/api/partidos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Partido.findByIdAndDelete(id);
    res.json({ message: "Partido eliminado" });
  } catch (error) {
    console.error("Error eliminando partido:", error);
    res.status(400).json({ error: error.message });
  }
});

// Jugadores

// Obtener todos los jugadores
app.get('/api/jugadores', async (req, res) => {
  try {
    const jugadores = await Jugador.find().populate('userId');
    res.json(jugadores);
  } catch (error) {
    console.error('Error obteniendo jugadores:', error);
    res.status(500).json({ error: 'Error obteniendo jugadores' });
  }
});

// Obtener jugador por userId
app.get('/api/jugadores/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const jugador = await Jugador.findOne({ userId }).populate('userId');
    res.json(jugador);
  } catch (error) {
    console.error('Error obteniendo jugador:', error);
    res.status(500).json({ error: 'Error obteniendo jugador' });
  }
});

// Crear jugador
app.post('/api/jugadores', async (req, res) => {
  try {
    const nuevo = new Jugador(req.body);
    await nuevo.save();
    res.json({ message: 'Jugador creado', nuevo });
  } catch (error) {
    console.error('Error creando jugador:', error);
    res.status(400).json({ error: error.message });
  }
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
