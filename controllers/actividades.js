// import database models and store in a variable
const db = require("../models");

// define methods for the actividades controller
module.exports = {
  // find all actividades
  findAll: (req, res) => {
    db.actividades
      .find(req.query)
      .sort({ date: 1 })
      .then(dbActividades => res.json(dbActividades))
      .catch(err => res.status(422).json(err));
  },
  // find actividad by id
  findByID: (req, res) => {
    db.actividades
      .find({ _id: req.params.id })
      .then(dbActividades => res.json(dbActividades))
      .catch(err => res.status(422).json(err));
  },

  // find actividad by topic and difficulty
  findByCategories: (cb, topicoCod, af_0) => {
    db.actividades
      .find({
        ["Topico"]: Number(topicoCod),
        ["Dificultad"]: {
          ["$lte"]: Math.round(Number(af_0) / 20),
          ["$gte"]: 0
        }
      })
      .exec(function(err, actividades) {
        if (err) cb(`Error: ${err} : No se pudieron retribuir actividades`);

        let random_activites = [];
        let i = 0;

        while (i < 2) {
          random_activites.push(
            actividades[Math.floor(Math.random() * actividades.length)]
          );

          i++;
        }
        cb(null, random_activites);
      });
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
