// import database models and store in a variable
const db = require("../models");

// define methods for the mensajes controller
module.exports = {
  // find all mensajes
  findAll: (req, res) => {
    db.mensajes
      .find(req.query)
      .sort({ date: 1 })
      .then(dbMensajes => res.json(dbMensajes))
      .catch(err => res.status(422).json(err));
  },
  // find mensaje by id
  findByID: (req, res) => {
    db.mensajes
      .find({ _id: req.params.mensajeID })
      .then(dbMensajes => res.json(dbMensajes))
      .catch(err => res.status(422).json(err));
  },
  // delete one mensaje
  deleteOne: (req, res) => {
    db.mensajes
      .deleteOne({ _id: req.params.mensajeID })
      .then(dbMensajes =>
        res.json(dbMensajes, `deleted ${req.params.mensajeID}`)
      )
      .catch(err => res.status(422).json(err));
  },
  // delete many mensajes
  deleteMany: (req, res) => {
    db.mensajes
      .deleteMany()
      .then(dbMensajes => res.json(dbMensajes))
      .catch(err => res.status(422).json(err));
  },
  // update one mensaje
  updateOne: (req, res) => {
    db.mensajes
      .updateOne({ _id: req.params.id }, req.query)
      .then(dbMensajes => res.json(dbMensajes))
      .catch(err => res.status(422).json(err));
  },
  // create one mensaje
  create: (req, res) => {
    const mensaje = req.body;

    db.mensajes
      .create(mensaje)
      .then(dbMensajes => res.json(dbMensajes))
      .catch(err => res.status(422).json(err));
  }
};
