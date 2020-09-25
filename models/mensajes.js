// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Mensajes = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  mensaje: { type: Schema.Types.String, required: true },
  tema: { type: Schema.Types.ObjectId, ref: "Tema", required: true }
});

const Mensaje = mongoose.model("Mensaje", Mensajes);

module.exports = Mensaje;
