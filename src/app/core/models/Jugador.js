import mongoose from 'mongoose';

const jugadorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  equipo: { type: String, default: null },
  posicion: { type: String, default: null },
  stats: { type: Object, default: {} },
});

export default mongoose.model('Jugador', jugadorSchema, 'jugadores');
