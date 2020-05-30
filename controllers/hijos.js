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
  // create one hijo
  create: (req, res) => {
    const hijo = req.body;
    const {
      edad,
      genero,
      peso,
      talla,
      noDificultadComp,
      noLleva,
      explosivoAgresivo,
      noDificultadEnt,
      usuario
    } = req.body;

    const newHijo = new Hijo({
      edad: edad,
      genero: genero,
      peso: peso,
      talla: talla,
      noDificultadComp: noDificultadComp,
      noLleva: noLleva,
      explosivoAgresivo: explosivoAgresivo,
      noDificultadEnt: noDificultadEnt,
      usuario: usuario
    });

    newHijo
      .save()
      .then(newHijo => {
        db.usuarios
          .updateOne(
            { _id: req.params.parentID },
            { $push: { hijos: newHijo._id } }
          )
          .then(parent => res.json(parent))
          .catch(err => res.status(422).json(err));
        // res.json(newHijo);
      })
      .catch(err => res.status(422).json(err));

    // db.hijos
    //   .create(hijo)
    //   .then(dbHijos => {
    //     console.log(dbHijos);

    //     return res.json(dbHijos);
    //   })
    //   .catch(err => res.status(422).json(err));
    // .then(d => {
  }
};
