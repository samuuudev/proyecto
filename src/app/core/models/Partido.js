import mongoose from 'mongoose';

const partidoSchema = new mongoose.Schema({
  equipoA: { type: String, required: true },
  equipoB: { type: String, required: true },
  fecha: { type: Date, required: true },
  mapa: { 
    type: String, 
    enum: ['Bind', 'Haven', 'Split', 'Ascent', 'Icebox'], 
    default: 'Bind' 
  },
  scoreA: { type: Number, default: 0 },
  scoreB: { type: Number, default: 0 },
  estado: { 
    type: String, 
    enum: ['pendiente', 'en curso', 'finalizado'], 
    default: 'pendiente' 
  },
});

export default mongoose.model('Partido', partidoSchema, 'partidos');
