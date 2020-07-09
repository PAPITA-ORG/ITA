// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Temas = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  tema: { type: Schema.Types.String, required: true },
  temaCod: { type: Schema.Types.Number, required: true }
});

const Tema = mongoose.model("Tema", Temas);

module.exports = Tema;
