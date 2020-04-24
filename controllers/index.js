// import database models and store in a variable
const db = require("../models");

// define methods for the indexes controller
module.exports = {
  // find all indexes
  findAll: (req, res) => {
    db.indexes
      .find(req.query)
      .then(dbIndexes => res.json(dbIndexes))
      .catch(err => res.status(422).json(err));
  },
  // find index by id
  findByID: (req, res) => {
    db.indexes
      .find({ _id: req.params.indexID })
      .sort({ date: 1 })
      .then(dbIndexes => res.json(dbIndexes))
      .catch(err => res.status(422).json(err));
  },
  // delete one index
  deleteOne: (req, res) => {
    db.indexes
      .deleteOne({ _id: req.params.indexID })
      .then(dbIndexes =>
        res.json(dbIndexes, `deleted ${req.params.indexID}`)
      )
      .catch(err => res.status(422).json(err));
  },
  // delete many indexes
  deleteMany: (req, res) => {
    db.indexes
      .deleteMany()
      .then(dbIndexes => res.json(dbIndexes))
      .catch(err => res.status(422).json(err));
  },
  // update one index
  updateOne: (req, res) => {
    db.indexes
      .updateOne({ _id: req.params.id }, req.query)
      .then(dbIndexes => res.json(dbIndexes))
      .catch(err => res.status(422).json(err));
  },
  // create one index
  create: (req, res) => {
    const index = req.body;

    db.indexes
      .create(index)
      .then(dbIndexes => res.json(dbIndexes))
      .catch(err => res.status(422).json(err));
  }
};
