// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Educacions = Schema({
  nivel: { type: Schema.Types.Number, required: true },
  nombre: { type: Schema.Types.String, required: true }
});

const Educacion = mongoose.model("Educacion", Educacions);

module.exports = Educacion;
