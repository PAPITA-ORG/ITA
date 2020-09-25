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
    let formData = req.body;
    let {
      af1,
      af2,
      dificultad,
      loginTime,
      logoutTime,
      random,
      hijos,
      usuario,
      actividad
    } = req.body;

    let ratingHijos = formData.hijos.map((hijo, i) => {
      return {
        hijo: hijo,
        rating: formData.ratings[i]
      };
    });

    db.ratingHijos
      .insertMany(ratingHijos)
      .then(ratingHijos => {
        db.historial
          .create({
            af1: Number(af1),
            af2: Number(af2),
            dificultad: Number(dificultad),
            ratingHijos: ratingHijos.map(rating => rating._id),
            loginTime: Number(loginTime),
            logoutTime: Number(logoutTime),
            random: Number(random),
            hijos: hijos,
            usuario: usuario,
            actividad: actividad
          })
          .then(historial => {
            db.usuarios
              .updateOne(
                { _id: usuario },
                { $push: { historial: historial._id } }
              )
              .then(usuario => {
                res.render("endsurvey", {
                  id: req.session.passport.user,
                  success_msg:
                    "Gracias por participar! Ahora a participar de nuevo"
                });
              })
              .catch(err => res.status(422).json(err));
          })
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  }
};
