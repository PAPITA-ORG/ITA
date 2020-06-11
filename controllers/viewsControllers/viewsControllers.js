// import Comunas model
const Comuna = require("../../models").comunas;

module.exports = {
  login: (req, res) => {
    res.render("index");
  },
  sobreView: (req, res) => {
    Comuna.find()
      .then(comunas => {
        let registrationForm = {
          edad: {
            label: "Edad",
            name: "edad"
          },
          parentesco: {
            label: "Parentesco",
            options: [
              "mama",
              "papa",
              "abuelo",
              "abuela",
              "otro familiar",
              "otro no familiar"
            ],
            name: "parentesco",
            type: "select"
          },
          genero: {
            label: "Genero",
            options: ["prefiero no decir", "otro", "mujer", "hombre"],
            name: "genero",
            type: "select"
          },
          comuna: {
            label: "Comuna",
            options: comunas,
            name: "comunaCod",
            type: "select"
          },
          sliderInputs: [
            {
              label: "Siempre puedo resolver problemas si trato lo suficiente",
              name: "i1"
            },
            {
              label: "Es facil lograr mis metas y mantener mis objetivos",
              name: "i2"
            },
            {
              label: "Se como manejar situaciones imprevistas",
              name: "i3"
            },
            {
              label: "Puedo mantener la calma ante nuevas dificultades",
              name: "i4"
            },
            {
              label: "Cuando tengo problemas, logro pensar varias soluciones",
              name: "i5"
            }
          ]
        };
        res.render("sobre", registrationForm);
      })
      .catch(err => err);
  },
  subscribeView: (req, res) => {
    res.render("/subscribe");
  },
  startView: (req, res) => {
    res.render("start", { id: req.session.passport.user });
  },
  registro: (req, res) => {
    res.render("registro");
  },
  tutorialView: (req, res) => {
    res.render("tutorial", { id: req.session.passport.user });
  },
  notfoundView: (req, res) => {
    res.render("notfound");
  }
};
