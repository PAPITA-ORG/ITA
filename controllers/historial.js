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
    const {
      af1,
      af2,
      disfruta,
      disfrutaNino,
      loginTime,
      logoutTime,
      random,
      usuario,
      actividad
    } = req.body;

    const newHistorial = new Historial({
      af1: af1,
      af2: af2,
      disfruta: disfruta,
      disfrutaNino: disfrutaNino,
      loginTime: loginTime,
      logoutTime: logoutTime,
      random: random,
      usuario: usuario,
      actividad: actividad
    });

    newHistorial.save(function(err, historial) {
      if (err) {
        throw err;
      }

      db.usuarios
        .updateOne(
          { _id: req.body.usuario },
          { $push: { historial: historial._id } }
        )
        .then(parent => res.json(parent))
        .catch(err => res.status(422).json(err));
    });
  }
};
