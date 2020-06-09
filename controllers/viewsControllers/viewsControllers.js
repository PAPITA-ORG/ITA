module.exports = {
  login: (req, res) => {
    res.render("index");
  },
  sobreView: (req, res) => {
    let registrationForm = {
      textInputs: [
        {
          label: "Edad"
        },
        {
          label: "Parentezco",
          options: [
            "mama",
            "papa",
            "abuelo",
            "abuela",
            "otro familiar",
            "otro no familiar"
          ]
        },
        {
          label: "Genero",
          options: ["prefiero no decir", "otro", "mujer", "hombre"]
        },
        {
          label: "Comuna",
          options: ["Calbuco", "Punta Arenas", "Antartica", "Santiago"]
        }
      ],
      sliderInputs: [
        {
          label: "Siempre puedo resolver problemas si trato lo suficiente"
        },
        {
          label: "Es facil lograr mis metas y mantener mis objetivos"
        },
        {
          label: "Se como manejar situaciones imprevistas"
        },
        {
          label: "Cuando tengo problemas, logro pensar varias soluciones"
        }
      ]
    };
    res.render("sobre", registrationForm);
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
