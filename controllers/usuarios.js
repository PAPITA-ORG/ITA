// import database models and store in a variable
const db = require("../models");

// define methods for the usuarios controller
module.exports = {
  // find all usuarios
  findAll: (req, res) => {
    db.usuarios
      .find(req.query)
      .then(dbUsuarios => res.json(dbUsuarios))
      .catch(err => res.status(422).json(err));
  },
  // find usuario by id
  findByID: (req, res) => {
    db.usuarios
      .find({ _id: req.params.usuarioID })
      .sort({ date: 1 })
      .then(dbUsuarios => res.json(dbUsuarios))
      .catch(err => res.status(422).json(err));
  },
  // delete one usuario
  deleteOne: (req, res) => {
    db.usuarios
      .deleteOne({ _id: req.params.usuarioID })
      .then(dbUsuarios =>
        res.json(dbUsuarios, `deleted ${req.params.usuarioID}`)
      )
      .catch(err => res.status(422).json(err));
  },
  // delete many usuarios
  deleteMany: (req, res) => {
    db.usuarios
      .deleteMany()
      .then(dbUsuarios => res.json(dbUsuarios))
      .catch(err => res.status(422).json(err));
  },
  // update one usuario
  updateOne: (req, res) => {
    db.usuarios
      .updateOne({ _id: req.params.id }, req.query)
      .then(dbUsuarios => res.json(dbUsuarios))
      .catch(err => res.status(422).json(err));
  },
  // create one usuario
  create: (req, res) => {
    const usuario = req.body;

    db.usuarios
      .create(usuario)
      .then(dbUsuarios => res.json(dbUsuarios))
      .catch(err => res.status(422).json(err));
  },
  // login usuario
  login: (req, res) => {
    res.render("login");
  }
};
