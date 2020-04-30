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
    const {
      correo,
      password,
      genero,
      parentezco,
      parentezcoCod,
      comuna,
      comunaCod,
      i1,
      i2,
      i3,
      i4,
      i5,
      af_0
    } = req.body;

    // validate creation of usuario

    // check required fields
    let errors = [];
    if (
      !correo ||
      !password ||
      !genero ||
      !parentezco ||
      !parentezcoCod ||
      !comuna ||
      !comunaCod ||
      !i1 ||
      !i2 ||
      !i3 ||
      !i4 ||
      !i5 ||
      !af_0
    ) {
      errors.push({ msg: "LLene el formulario completo por favor" });
    }

    // check password length
    if (password.length < 6) {
      errors.push({ msg: "Su contraseña debe ser de al menos 6 caracteres" });
    }

    if (errors.length > 0) {
      res.json(errors);
    } else {
      db.usuarios
        .create(usuario)
        .then(dbUsuarios => res.json(dbUsuarios))
        .catch(err => res.status(422).json(err));
    }
  }
};
