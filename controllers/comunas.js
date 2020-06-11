// import database models and store in a variable
const db = require("../models");

// define methods for the comunas controller
module.exports = {
  // find all comunas
  findAll: (req, res) => {
    db.comunas
      .find()
      .sort({ date: 1 })
      .then(dbComunas => res.json(dbComunas))
      .catch(err => res.status(422).json(err));
  },
  // find comuna by id
  findByID: (req, res) => {
    db.comunas
      .find({ _id: req.params.comunaID })
      .then(dbComunas => res.json(dbComunas))
      .catch(err => res.status(422).json(err));
  },
  // delete one comuna
  deleteOne: (req, res) => {
    db.comunas
      .deleteOne({ _id: req.params.comunaID })
      .then(dbComunas => res.json(dbComunas, `deleted ${req.params.comunaID}`))
      .catch(err => res.status(422).json(err));
  },
  // delete many comunas
  deleteMany: (req, res) => {
    db.comunas
      .deleteMany()
      .then(dbComunas => res.json(dbComunas))
      .catch(err => res.status(422).json(err));
  },
  // update one comuna
  updateOne: (req, res) => {
    db.comunas
      .updateOne({ _id: req.params.id }, req.query)
      .then(dbComunas => res.json(dbComunas))
      .catch(err => res.status(422).json(err));
  },
  // create one comuna
  create: (req, res) => {
    const comuna = req.body;
    db.comunas
      .create(comuna)
      .then(dbComunas => res.json(dbComunas))
      .catch(err => res.status(422).json(err));
  }
};
