// import database models and store in a variable
const db = require("../models");

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
  // create one hije
  create: (req, res) => {
    let { data } = req.body;

    data = data.filter(hije => hije !== null);
    data.map(
      hijo =>
        (hijo.avatarUrl = `https://avatars.dicebear.com/api/bottts/${hijo.nombre}.svg?mood[]=happy`)
    );

    db.hijos
      .insertMany(data)
      .then(hijos => {
        let ids = hijos.map(hijo => {
          return hijo._id;
        });

        db.usuarios
          .updateOne(
            { _id: req.params.parentID },
            { $push: { hijos: { $each: ids } } }
          )
          .then(parent => {
            // temporalmente para usuarios del preregistro, captamos que acaben de registrar a sus hijes
            req.session["primer_login"] = true;
            res.redirect("/start");
          })
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  }
};
