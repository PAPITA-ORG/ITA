// import database models and store in a variable
const db = require("../models");

const Historial = db.historial;

// define methods for the historiales controller
module.exports = {
  // find all historiales
  findAll: (req, res) => {
    db.historial
      .find(req.query)
      .sort({ date: 1 })
      .then(dbhistorial => res.json(dbhistorial))
      .catch(err => res.status(422).json(err));
  },
  // find historial by id
  findByID: (req, res) => {
    db.historial
      .find({ _id: req.params.historialID })
      .then(dbhistorial => res.json(dbhistorial))
      .catch(err => res.status(422).json(err));
  },
  // delete one historial
  deleteOne: (req, res) => {
    db.historial
      .deleteOne({ _id: req.params.historialID })
      .then(dbhistorial =>
        res.json(dbhistorial, `deleted ${req.params.historialID}`)
      )
      .catch(err => res.status(422).json(err));
  },
  // delete many historial
  deleteMany: (req, res) => {
    db.historial
      .deleteMany()
      .then(dbhistorial => res.json(dbhistorial))
      .catch(err => res.status(422).json(err));
  },
  // update one historial
  updateOne: (req, res) => {
    db.historial
      .updateOne({ _id: req.params.id }, req.query)
      .then(dbhistorial => res.json(dbhistorial))
      .catch(err => res.status(422).json(err));
  },
  // create one historial
  create: (req, res) => {
    db.historial
      .create(req.body)
      .then(historial => {
        let historial_filtro = {
          loginTime: historial.loginTime,
          logoutTime: historial.logoutTime,
          disfruta: historial.disfruta,
          // ratingHijos: historial.ratingHijos,
          actividad: historial.actividad
        };

        db.usuarios
          .updateOne(
            { _id: historial.usuario },
            { $push: { historial: historial._id } }
          )
          .then(parent => res.json(parent))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  }
};
