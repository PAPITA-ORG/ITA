// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Historiales = Schema({
  af1: { type: Schema.Types.Number },
  af2: { type: Schema.Types.Number },
  disfruta: { type: Schema.Types.Number },
  disfrutaNino: { type: Schema.Types.Number },
  loginTime: { type: Schema.Types.Number },
  logoutTime: { type: Schema.Types.Number },
  random: { type: Schema.Types.Number },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
  actividad: { type: Schema.Types.ObjectId, ref: "Actividad" }
});

const Historial = mongoose.model("Historiale", Historiales);

module.exports = Historial;
