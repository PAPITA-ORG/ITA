// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Actividades = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  topico: { type: Schema.Types.String, required: true },
  topicoCod: { type: Schema.Types.Number, required: true },
  descriptor: { type: Schema.Types.String, required: true },
  link: { type: Schema.Types.String, required: true },
  dificultad: { type: Schema.Types.String, required: true },
  dificultadCod: { type: Schema.Types.Number, required: true },
  duracion: { type: Schema.Types.Number, required: true },
  fuente: { type: Schema.Types.String, required: true },
  flagCovid: { type: Schema.Types.Boolean, required: true },
  flagVpn: { type: Schema.Types.Boolean, required: true },
  flagOtro: { type: Schema.Types.Boolean, required: true },
  flagPlain: { type: Schema.Types.Boolean, required: true }
});

const Actividad = mongoose.model("Actividad", Actividades);

module.exports = Actividad;
