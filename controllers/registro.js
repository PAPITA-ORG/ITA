// import database models and store in a variable
const db = require("../models");

// define methods for the registros controller
module.exports = {
  // find all registros
  findAll: (req, res) => {
    db.registros
      .find(req.query)
      .sort({ date: 1 })
      .then(dbRegistros => res.json(dbRegistros))
      .catch(err => res.status(422).json(err));
  },
  // find registro by id
  findByID: (req, res) => {
    db.registros
      .find({ _id: req.params.registroID })
      .then(dbRegistros => res.json(dbRegistros))
      .catch(err => res.status(422).json(err));
  },
  // delete one registro
  deleteOne: (req, res) => {
    db.registros
      .deleteOne({ _id: req.params.registroID })
      .then(dbRegistros =>
        res.json(dbRegistros, `deleted ${req.params.registroID}`)
      )
      .catch(err => res.status(422).json(err));
  },
  // delete many registros
  deleteMany: (req, res) => {
    db.registros
      .deleteMany()
      .then(dbRegistros => res.json(dbRegistros))
      .catch(err => res.status(422).json(err));
  },
  // update one registro
  updateOne: (req, res) => {
    db.registros
      .updateOne({ _id: req.params.id }, req.query)
      .then(dbRegistros => res.json(dbRegistros))
      .catch(err => res.status(422).json(err));
  },
  // create one registro
  create: (req, res) => {
    const registro = req.body;

    db.registros
      .create(registro)
      .then(dbRegistros => res.json(dbRegistros))
      .catch(err => res.status(422).json(err));
  }
};
