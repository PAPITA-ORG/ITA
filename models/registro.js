// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Registros = Schema({
  correo: { type: Schema.Types.String, required: true },
  password: { type: Schema.Types.String, required: true }
});

const Registro = mongoose.model("Registro", Registros);

module.exports = Registro;