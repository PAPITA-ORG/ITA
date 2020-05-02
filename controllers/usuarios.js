// import database models and store in a variable
const db = require("../models");
// import LocalStrategy from passport-local and bcrypt
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

// define methods for the usuarios controller
module.exports = {
  // find all usuarios
  findAll: (req, res) => {
    db.usuarios
      .find()
      .sort({ date: 1 })
      .then(dbUsuarios => res.json(dbUsuarios))
      .catch(err => res.status(422).json(err));
  },
  // find usuario by id
  findByID: (req, res) => {
    db.usuarios
      .find({ _id: req.params.usuarioID })
      .then(dbUsuarios => res.json(dbUsuarios))
      .catch(err => res.status(422).json(err));
  },
  // find usuario by credentials
  findByCredentials: passport => {
    passport.use(
      new LocalStrategy(
        { usernameField: "correo" },
        (correo, password, done) => {
          // Validar usuario
          db.usuarios
            .findOne({ correo: correo })
            .then(usuario => {
              if (!usuario) {
                return done(null, false, {
                  message: "Su correo no esta aun registrado!"
                });
              }

              // Validar password
              bcrypt.compare(password, usuario.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                  return done(null, usuario);
                } else {
                  return done(null, false, {
                    message: "Su clave esta incorrecta..."
                  });
                }
              });
            })
            .catch(err => err);
        }
      )
    );

    passport.serializeUser((user, done) => {
      return done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      db.usuarios.findById(id, (err, user) => {
        return done(err, user);
      });
    });
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
  }
};
