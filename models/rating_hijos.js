const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingHijos = Schema({
  hijo: { type: Schema.Types.ObjectId, ref: "Hijo" },
  historial: { type: Schema.Types.ObjectId, ref: "Historial" },
<<<<<<< HEAD
=======
  actividad: { type: Schema.Types.ObjectId, ref: "Actividad" },
>>>>>>> 5a0d30f9488c206433491910477292f53c4dc3f9
  rating: { type: Schema.Types.Number },
  fecha: { type: Schema.Types.Date, default: Date.now() }
});

const RatingHijo = mongoose.model("RatingHijo", RatingHijos);

module.exports = RatingHijo;
