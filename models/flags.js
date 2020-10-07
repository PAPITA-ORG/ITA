// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Flags = Schema({
  nombre: { type: Schema.Types.String, required: true },
  descripcion: { type: Schema.Types.String, required: true },
  actividad: { type: Schema.Types.ObjectId, ref: "Actividad", required: true }
});

const Flag = mongoose.model("Flag", Flags);

module.exports = Flag;
