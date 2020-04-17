// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Historiales = newSchema({
  _id: { type: Schema.Types.ObjectId, required: true },
  af1: { type: Schema.Types.String, required: true },
  af2: { type: Schema.Types.String, required: true },
  disfruta: { type: Schema.Types.String, required: true },
  disfrutaNino: { type: Schema.Types.Array, required: true },
  loginTime: { type: Schema.Types.Date, default: Date.now, required: true },
  logoutTime: { type: Schema.Types.Date, default: Date.now, required: true },
  random: { type: Schema.Types.String, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  actividad: { type: Schema.Types.ObjectId, ref: "Actividad", required: true }
});

const Historial = mongoose.model("Historial", Historiales);

module.exports = Historial;
