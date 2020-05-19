// import database models and store in a variable
const db = require("../models");

// define methods for the historiales controller
module.exports = {
  // find all historiales
  findAll: (req, res) => {
    db.historiales
      .find(req.query)
      .sort({ date: 1 })
      .then(dbHistoriales => res.json(dbHistoriales))
      .catch(err => res.status(422).json(err));
  },
  // find historial by id
  findByID: (req, res) => {
    db.historiales
      .find({ _id: req.params.historialID })
      .then(dbHistoriales => res.json(dbHistoriales))
      .catch(err => res.status(422).json(err));
  },
  // delete one historial
  deleteOne: (req, res) => {
    db.historiales
      .deleteOne({ _id: req.params.historialID })
      .then(dbHistoriales =>
        res.json(dbHistoriales, `deleted ${req.params.historialID}`)
      )
      .catch(err => res.status(422).json(err));
  },
  // delete many historiales
  deleteMany: (req, res) => {
    db.historiales
      .deleteMany()
      .then(dbHistoriales => res.json(dbHistoriales))
      .catch(err => res.status(422).json(err));
  },
  // update one historial
  updateOne: (req, res) => {
    db.historiales
      .updateOne({ _id: req.params.id }, req.query)
      .then(dbHistoriales => res.json(dbHistoriales))
      .catch(err => res.status(422).json(err));
  },
  // create one historial
  create: (req, res) => {
    const historial = req.body;

    db.historiales
      .create(historial)
      .then(dbHistoriales => res.json(dbHistoriales))
      .catch(err => res.status(422).json(err));
  }
};
