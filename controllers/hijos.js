// import database models and store in a variable
const db = require("../models");
const bcrypt = require("bcryptjs");

const Hijo = db.hijos;

// define methods for the hijos controller
module.exports = {
  // find all hijos
  findAll: (req, res) => {
    db.hijos
      .find()
      .sort({ date: 1 })
      .then(dbHijos => res.json(dbHijos))
      .catch(err => res.status(422).json(err));
  },
  // find hijo by id
  findByID: (req, res) => {
    db.hijos
      .find({ _id: req.params.hijoID })
      .then(dbHijos => res.json(dbHijos))
      .catch(err => res.status(422).json(err));
  },
  // delete one hijo
  deleteOne: (req, res) => {
    db.hijos
      .deleteOne({ _id: req.params.hijoID })
      .then(dbHijos => res.json(dbHijos, `deleted ${req.params.hijoID}`))
      .catch(err => res.status(422).json(err));
  },
  // delete many hijos
  deleteMany: (req, res) => {
    db.hijos
      .deleteMany()
      .then(dbHijos => res.json(dbHijos))
      .catch(err => res.status(422).json(err));
  },
  // update one hijo
  updateOne: (req, res) => {
    db.hijos
      .updateOne({ _id: req.params.id }, req.query)
      .then(dbHijos => res.json(dbHijos))
      .catch(err => res.status(422).json(err));
  },
  // create one hijo
  create: (req, res) => {
    let encryptedChildren = req.body.data.map(child => {
      let hash = bcrypt.hashSync(child.nombre, 10);
      child.nombre = hash;
      return child;
    });

    db.hijos
      .insertMany(encryptedChildren)
      .then(hijos => {
        let ids = hijos.map(hijo => {
          return hijo._id;
        });

        db.usuarios
          .updateOne(
            { _id: req.params.parentID },
            { $push: { hijos: { $each: ids } } }
          )
          .then(parent => res.json(parent))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  }
};
