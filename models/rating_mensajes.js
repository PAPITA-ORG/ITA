const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingMensajes = Schema({
  mensaje: { type: Schema.Types.ObjectId, ref: "Mensaje" },
  historial: { type: Schema.Types.ObjectId, ref: "Historial" },
  rating: { type: Schema.Types.Number },
  fecha: { type: Schema.Types.Date, default: Date.now() }
});

const RatingMensaje = mongoose.model("RatingMensaje", RatingMensajes);

module.exports = RatingMensaje;
