// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Historiales = Schema({
  af1: { type: Schema.Types.Number },
  af2: { type: Schema.Types.Number },
  disfruta: { type: Schema.Types.Number },
  ratingHijos: [{ type: Schema.Types.ObjectId, ref: "RatingHijo" }],
  ratingMensajes: [{ type: Schema.Types.ObjectId, ref: "RatingMensaje" }],
  loginTime: { type: Schema.Types.Number },
  logoutTime: { type: Schema.Types.Number },
  random: { type: Schema.Types.Number },
  hijos: [{ type: Schema.Types.ObjectId, ref: "Hijo" }],
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
  actividad: { type: Schema.Types.ObjectId, ref: "Actividad" },
  fecha: { type: Schema.Types.Date, default: Date.now() }
});

const Historial = mongoose.model("Historial", Historiales);

module.exports = Historial;
