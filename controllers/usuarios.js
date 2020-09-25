// import database models and store in a variable
const db = require("../models");
const axios = require("axios");
// import LocalStrategy from passport-local and bcrypt
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

const controllerRenders = require("./viewsControllers/controllerRenders");

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
      .find({ _id: req.params.id })
      .populate("historials")
      .then(dbUsuarios => res.json(dbUsuarios))
      .catch(err => res.status(422).json(err));
  },
  // find usuario by credentials
  findByCredentials: passport => {
    passport.use(
      new LocalStrategy(
        { usernameField: "correo", passReqToCallback: true },
        (req, correo, password, done) => {
          // Validar usuario
          db.usuarios
            .findOne({ correo: correo })
            .then(usuario => {
              if (!usuario) {
                return done(
                  null,
                  false,
                  req.flash("error_msg", "Su correo no esta aun registrado!")
                );
              }

              // Validar password
              bcrypt.compare(password, usuario.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                  return done(null, usuario);
                } else {
                  return done(
                    null,
                    false,
                    req.flash("error_msg", "Su clave esta incorrecta...")
                  );
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
      .updateOne({ _id: req.params.id }, req.body)
      .then(dbUsuarios => res.json(dbUsuarios))
      .catch(err => res.status(422).json(err));
  },
  logout: (req, res) => {
    req.logout();
    res.send({ url: "/" });
  },
  changePassword: (req, res) => {
    // validate email is actually registered in database
    db.usuarios
      .find({ correo: req.body.correo })
      .then(usuario => {
        let view_data = require("./viewsControllers/controllerRenders").renderNavContent(
          "index"
        );
        // if no user is found...
        if (usuario.length === 0) {
          res.render("registro", {
            correo_err: "Lo sentimos, su cuenta aun no esta registrada",
            view_data: view_data
          });
        } else if (req.body.password.length < 6) {
          res.render("registro", {
            correo_err: "Lo sentimos, su contraseña debe ser al menos 6 caracteres",
            view_data: view_data
          });
        } else {
          // hash password from request body
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            return bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              db.usuarios
                .updateOne({ correo: req.body.correo }, { password: hash })
                .then(dbUsuarios => {
                  let view_data = require("./viewsControllers/controllerRenders").renderNavContent(
                    "index"
                  );
                  axios
                    .post("/api/mailer/passwordChanged", { 'to': req.body.correo })
                    .then(r => {
                      console.log("Changed password email sent")
                      return r;
                    })
                    .catch(error => {
                      console.log("error, Changed password email not sent: " + error)
                    });
                  res.render("registro", {
                    correo_success: "Enhorabuena! su contraseña ha cambiado",
                    view_data: view_data
                  });
                })
                .catch(err => res.status(422).json(err));
            });
          });
        }
      })
      .catch(err => res.status(422).json(err));
  },
  chooseRandomActivities: (req, res, next) => {
    req.session["af1"] = req.body.af_0;
    req.session["hijos"] = req.body.hijos;
    let fetchActivities = require("./actividades").findByCategories;

    fetchActivities(handleFetchActivities, req.params.topicoCod, req.body.af_0);

    function handleFetchActivities(err, data) {
      if (err) return res.json(err);

      return res.json({
        activities: data,
        topicoCod: req.params.topicoCod,
        hijos: req.body.hijos,
        af_0: req.body.af_0
      });
    }
  },
  download: (req, res) => {
    let download = require("download-pdf");

    let pdf = req.body.pdf;

    let options = {
      directory: "",
      filename: "test.pdf"
    };

    download(pdf, options, function (err) {
      if (err) return err;
      res.json("downloading!");
    });
  }
};
