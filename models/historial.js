// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Historiales = Schema({
  af1: { type: Schema.Types.Number },
  af2: { type: Schema.Types.Number },
  disfruta: { type: Schema.Types.Number },
  ratingHijos: [{ type: Schema.Types.ObjectId, ref: "RatingHijo" }],
<<<<<<< HEAD
  ratingMensajes: [{ type: Schema.Types.ObjectId, ref: "RatingMensaje" }],
=======
>>>>>>> 5a0d30f9488c206433491910477292f53c4dc3f9
  loginTime: { type: Schema.Types.Number },
  logoutTime: { type: Schema.Types.Number },
  random: { type: Schema.Types.Number },
  hijos: [{ type: Schema.Types.ObjectId, ref: "Hijo" }],
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
  actividad: { type: Schema.Types.ObjectId, ref: "Actividad" },
  fecha: { type: Schema.Types.Date, default: Date.now() }
});

const Historial = mongoose.model("Historial", Historiales);

module.exports = Historial;
