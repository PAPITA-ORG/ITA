// import database models and store in a variable
const db = require("../models");

// define methods for the actividades controller
module.exports = {
  // find all actividades
  findAll: (req, res) => {
    db.actividades
      .find(req.query)
      .then(dbActividades => res.json(dbActividades))
      .catch(err => res.status(422).json(err));
  },
  // find actividad by id
  findByID: (req, res) => {
    db.actividades
      .find({ _id: req.params.actividadID })
      .sort({ date: 1 })
      .then(dbActividades => res.json(dbActividades))
      .catch(err => res.status(422).json(err));
  },
  // delete one actividad
  deleteOne: (req, res) => {
    db.actividades
      .deleteOne({ _id: req.params.actividadID })
      .then(dbActividades =>
        res.json(dbActividades, `deleted ${req.params.actividadID}`)
      )
      .catch(err => res.status(422).json(err));
  },
  // delete many actividades
  deleteMany: (req, res) => {
    db.actividades
      .deleteMany()
      .then(dbActividades => res.json(dbActividades))
      .catch(err => res.status(422).json(err));
  },
  // update one actividad
  updateOne: (req, res) => {
    db.actividades
      .updateOne({ _id: req.params.id }, req.query)
      .then(dbActividades => res.json(dbActividades))
      .catch(err => res.status(422).json(err));
  },
  // create one actividad
  create: (req, res) => {
    const actividad = req.body;

    db.actividades
      .create(actividad)
      .then(dbActividades => res.json(dbActividades))
      .catch(err => res.status(422).json(err));
  }
};