// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuarios = Schema({
  correo: { type: Schema.Types.String, required: true },
  password: { type: Schema.Types.String, required: true },
  edad: { type: Schema.Types.Number, required: true },
  genero: { type: Schema.Types.Number, required: true },
  parentesco: { type: Schema.Types.Number, required: true },
  comunaCod: { type: Schema.Types.ObjectId, ref: "Comunas" },
  i1: { type: Schema.Types.Number, required: true },
  i2: { type: Schema.Types.Number, required: true },
  i3: { type: Schema.Types.Number, required: true },
  i4: { type: Schema.Types.Number, required: true },
  i5: { type: Schema.Types.Number, required: true },
  af_0: { type: Schema.Types.Number, required: true },
  tutorial: { type: Schema.Types.Number, required: true },
  historial: [{ type: Schema.Types.ObjectId, ref: "Historial" }]
});

const Usuario = mongoose.model("Usuario", Usuarios);

module.exports = Usuario;
