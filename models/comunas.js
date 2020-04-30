// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comunas = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  comuna: { type: Schema.Types.String, required: true },
  comunaCod: { type: Schema.Types.Number, required: true }
});

const Comuna = mongoose.model("Comuna", Comunas);

module.exports = Comuna;
