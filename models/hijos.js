// import mongoose and initialize schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hijos = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  edad: { type: Schema.Types.String, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true }
});

const Hijo = mongoose.model("Hijo", Hijos);

module.exports = Hijo;
