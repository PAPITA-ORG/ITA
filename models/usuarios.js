// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuarios = newSchema({
  _id: { type: Schema.Types.ObjectId, required: true },
  correo: { type: Schema.Types.String, required: true },
  password: { type: Schema.Types.String, required: true },
  genero: { type: Schema.Types.String, required: true },
  parentezco: { type: Schema.Types.String, required: true },
  parentezcoCod: { type: Schema.Types.Array, required: true },
  comuna: { type: Schema.Types.String, required: true },
  comunaCod: { type: Schema.Types.String, required: true },
  i1: { type: Schema.Types.ObjectId, required: true },
  correo: { type: Schema.Types.String, required: true },
  i2: { type: Schema.Types.ObjectId, required: true },
  correo: { type: Schema.Types.String, required: true },
  i3: { type: Schema.Types.ObjectId, required: true },
  i4: { type: Schema.Types.String, required: true },
  i5: { type: Schema.Types.ObjectId, required: true },
  af_0: { type: Schema.Types.String, required: true },
  historial: [{ type: Schema.Types.ObjectId, ref: "Historial" }]
});

const Usuario = mongoose.model("Usuario", Usuarios);

module.exports = Usuario;
