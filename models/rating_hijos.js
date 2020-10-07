const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingHijos = Schema({
  hijo: { type: Schema.Types.ObjectId, ref: "Hijo" },
  rating: { type: Schema.Types.Number },
  fecha: { type: Schema.Types.Date, default: Date.now() }
});

const RatingHijo = mongoose.model("RatingHijo", RatingHijos);

module.exports = RatingHijo;
