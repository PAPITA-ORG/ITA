// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Mensajes = newSchema({
  _id: { type: Schema.Types.ObjectId, required: true },
  mensaje: { type: Schema.Types.String, required: true }
});

const Mensaje = mongoose.model("Mensaje", Mensajes);

module.exports = Mensaje;
