import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'jugador', 'arbitro'], default: 'jugador' },
});

export default mongoose.model('Usuario', userSchema, 'usuarios');
