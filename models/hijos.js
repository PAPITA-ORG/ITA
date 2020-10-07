// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hijos = Schema({
  nombre: { type: Schema.Types.String, required: true },
  edad: { type: Schema.Types.String, required: true },
  genero: { type: Schema.Types.Number, required: true },
  peso: { type: Schema.Types.Number, required: true },
  talla: { type: Schema.Types.Number, required: true },
  e1: { type: Schema.Types.Number, required: true },
  e2: { type: Schema.Types.Number, required: true },
  e3: { type: Schema.Types.Number, required: true },
  e4: { type: Schema.Types.Number, required: true },
  e5: { type: Schema.Types.Number, required: true },
  cd: { type: Schema.Types.Boolean, required: true, default: 0 },
  ce: { type: Schema.Types.Boolean, required: true, default: 0 },
  frecuencia_actividad: { type: Schema.Types.Number, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  avatarUrl: { type: Schema.Types.String, required: true }
});

const Hijo = mongoose.model("Hijo", Hijos);

module.exports = Hijo;
