// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hijos = Schema({
  edad: { type: Schema.Types.String, required: true },
  genero: { type: Schema.Types.Number, required: true },
  peso: { type: Schema.Types.Number, required: true },
  talla: { type: Schema.Types.Number, required: true },
  noDificultadComp: { type: Schema.Types.Number, required: true },
  noLleva: { type: Schema.Types.Number, required: true },
  explosivoAgresivo: { type: Schema.Types.Number, required: true },
  noDificultadEnt: { type: Schema.Types.Number, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true }
});

const Hijo = mongoose.model("Hijo", Hijos);

module.exports = Hijo;
