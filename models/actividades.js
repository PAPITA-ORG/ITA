// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Actividades = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  Topico: { type: Schema.Types.Number, required: true },
  Descriptor: { type: Schema.Types.String, required: true },
  Link: { type: Schema.Types.String, required: true },
  Dificultad: { type: Schema.Types.Number, required: true },
  Edad_desde: { type: Schema.Types.Number, required: true },
  Edad_hasta: { type: Schema.Types.Number },
  Duracion: { type: Schema.Types.Number },
  Fuente: { type: Schema.Types.String },
  flag_covid: { type: Schema.Types.String },
  flag_vpn: { type: Schema.Types.String },
  flag_otro: { type: Schema.Types.String },
  flag_plain: { type: Schema.Types.String },
  flag_veg: { type: Schema.Types.String },
  flag_glufree: { type: Schema.Types.String }
});

const Actividad = mongoose.model("Actividade", Actividades);

module.exports = Actividad;
